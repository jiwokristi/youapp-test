'use client';

import { useEffect, ReactNode, useContext, ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import clsx from 'clsx';

import { Input } from '@/components/input';
import { Select, Option, GroupOption } from '@/components/Select';
import { DatePicker } from '@/components/datepicker/DatePicker';
import { Plus } from '@/components/icons';

import { About, User, aboutSchema } from '@/lib/validations/user';

import { saveProfile } from '@/lib/actions/user';

import { getChineseZodiac, getHoroscope } from '@/lib/helpers/getter';

import { ToastContext } from '@/lib/contexts/toast';

import { aboutFormFields } from '@/lib/constants/form-fields';
import { selectStyles } from '@/lib/constants/variants/select';
import { allowedExtensions } from '@/lib/constants/extension';

import EditButton from './EditButton';

export default function AboutForm({
  userSessionId,
  user,
  children,
}: {
  userSessionId: string | null;
  user: User | null;
  children: ReactNode;
}) {
  const { onToggle, fields } = useContext(ToastContext);

  const isShow = fields.includes('about');

  const [image, setImage] = useState<File>();

  const {
    register,
    control,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm<About>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      id: user?.profile?.id || null,
      userId: userSessionId || null,
      displayName: user ? user.profile?.displayName : '',
      gender: user ? user.profile?.gender : '',
      dob: user ? user.profile?.dob : null,
      horoscope: user ? user.profile?.horoscope : '',
      zodiac: user ? user.profile?.zodiac : '',
      height: user ? user.profile?.height : '',
      weight: user ? user.profile?.weight : '',
    },
    mode: 'onChange',
  });

  const dynamicDob = watch('dob');

  const actionWithArgs = saveProfile.bind(
    null,
    dynamicDob as string,
    String(user?.profile?.id),
    String(isDirty),
    user?.username as string,
  );

  useEffect(() => {
    if (dynamicDob) {
      setValue('horoscope', getHoroscope(new Date(dynamicDob as string)));
      setValue('zodiac', getChineseZodiac(new Date(dynamicDob as string)));
    }
  }, [dynamicDob, setValue]);

  return (
    <form
      id="Form__About"
      noValidate
      className="relative mb-16 min-h-[12rem] w-full max-w-[50rem] rounded-2xl bg-initial-state-medium p-24 pl-32"
      action={async (formData: FormData) => {
        try {
          await actionWithArgs(formData);

          if (image) {
            const imageFormData = new FormData();
            imageFormData.append('image', image as File);
            imageFormData.append('userId', userSessionId as string);
            imageFormData.append('id', String(user?.profile?.id));

            const { status } = await axios.post(
              'http://localhost:4000/upload',
              imageFormData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            if (status === 200) {
              onToggle(
                'Successfully uploaded photo! Refresh the page to see changes.',
                'success',
                2000,
              );
            }
          }
        } catch (error) {
          console.log('ERROR CREATE PROFILE ----->', error);
        }
      }}
    >
      {userSessionId && userSessionId === user?.id && (
        <EditButton fieldName="about" />
      )}
      <span className="mb-32 inline-block text-14 font-bold">About</span>

      {children}

      <div
        className={clsx('flex flex-col gap-16 transition-all ease-in', {
          'max-h-[43rem] pb-24': isShow,
          'max-h-0': !isShow,
        })}
      >
        {aboutFormFields.map(item =>
          item.type === 'image' ? (
            <div
              key={item.id}
              className={clsx('flex items-center gap-16', {
                'max-h-0 opacity-0': !isShow,
                'opacity-100': isShow,
              })}
            >
              <div className="relative flex h-[5.7rem] w-[5.7rem] items-center justify-center overflow-hidden rounded-3xl bg-white/5 transition-all ease-in hover:bg-white/10">
                {image && (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="Selected image."
                    className="absolute"
                    width={57}
                    height={57}
                  />
                )}
                <Controller
                  name={item.name as keyof About}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      value=""
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const selectedFile = e.target?.files?.[0];

                        if (selectedFile) {
                          const fileExtension = selectedFile.name
                            .split('.')
                            ?.pop()
                            ?.toLowerCase();
                          if (
                            !allowedExtensions.includes(fileExtension as string)
                          ) {
                            onToggle(
                              'Oops! We only accept PNG/JPG/JPEG files.',
                              'danger',
                              2000,
                            );
                            return;
                          }

                          if (selectedFile.size > 2 * 1000000) {
                            onToggle(
                              'Oops! Maximum file size is 2MB.',
                              'danger',
                              2000,
                            );
                            return;
                          }
                          setImage(selectedFile);
                          // const reader = new FileReader();
                          // reader.addEventListener('load', () => {
                          //   field.onChange(reader.result);
                          // });
                          // reader.readAsDataURL(selectedFile);
                        }
                      }}
                      className="absolute inset-x-0 inset-y-0 -translate-y-4 cursor-pointer opacity-0"
                    />
                  )}
                />

                <Plus classes="golden" />
              </div>
              <label htmlFor={item.name} className="text-12">
                {item.label}
              </label>
            </div>
          ) : item.type === 'text' ? (
            <div
              key={item.id}
              className={clsx(
                'flex items-center justify-between gap-8 transition-all ease-in',
                {
                  'max-h-0 opacity-0': !isShow,
                  'opacity-100': isShow,
                },
              )}
            >
              <label
                htmlFor={item.name}
                className="basis-1/3 text-[1.3rem] opacity-30"
              >
                {item.label}
              </label>
              <Input
                {...register(item.name as keyof About)}
                variant="outlined"
                color="white"
                size="sm"
                align="right"
                readOnly={['horoscope', 'zodiac'].includes(item.name)}
                placeholder={
                  ['horoscope', 'zodiac'].includes(item.name)
                    ? '--'
                    : item.placeholder
                }
                containerClasses="basis-2/3"
                inputClasses={`rounded-xl ${['horoscope', 'zodiac'].includes(item.name) ? 'text-white/40' : ''}`}
              />
            </div>
          ) : item.type === 'select' ? (
            <div
              key={item.id}
              className={clsx(
                'flex items-center justify-between gap-8 transition-all ease-in',
                {
                  'max-h-0 opacity-0': !isShow,
                  'opacity-100': isShow,
                },
              )}
            >
              <label
                htmlFor={item.name}
                className="basis-1/3 text-[1.3rem] opacity-30"
              >
                {item.label}
              </label>
              <Controller
                name={item.name as keyof About}
                control={control}
                render={({ field }) => {
                  let selectedOption;
                  if (item.options && item.options.length > 0) {
                    const isSingle = !('options' in item.options[0]);

                    selectedOption = isSingle
                      ? (item.options as Option[]).find(
                          (opt: Option) => opt.value === field.value,
                        )
                      : (item.options as GroupOption[])
                          .map((group: GroupOption) => group.options)
                          .flat()
                          .find((opt: Option) => opt.value === field.value);
                  }

                  return (
                    <Select<Option, false>
                      name={item.name}
                      options={item.options}
                      classes="basis-2/3 text-[1.3rem] text-right"
                      placeholder={item.placeholder}
                      defaultValue={selectedOption}
                      onChange={option => {
                        field.onChange((option as Option).value);
                      }}
                      styles={{
                        ...selectStyles,
                        control: (baseStyles, { isFocused, isDisabled }) => ({
                          ...baseStyles,
                          backgroundColor: 'rgba(217, 217, 217, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '0.8rem',
                          transition: 'all 0.15s',
                          opacity: isDisabled ? 0.3 : 1,
                          boxShadow: isFocused
                            ? '0 0 0 0.3rem rgba(76, 104, 108, 0.75)'
                            : 'none',
                          ':hover': {
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          },
                          '& > div:last-child > div > svg': {
                            transition: 'all 0.15s ease-in-out',
                            transform: isFocused
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                            color: 'rgba(255, 255, 255, 0.1)',
                          },
                        }),
                      }}
                    />
                  );
                }}
              />
            </div>
          ) : (
            <div
              key={item.id}
              className={clsx(
                'flex items-center justify-between gap-8 transition-all ease-in',
                {
                  'max-h-0 opacity-0': !isShow,
                  'opacity-100': isShow,
                },
              )}
            >
              <label
                htmlFor={item.name}
                className="basis-1/3 text-[1.3rem] opacity-30"
              >
                {item.label}
              </label>
              <DatePicker
                popoverProps={{
                  position: 'right',
                  containerClasses: 'basis-2/3',
                  toggleComponentClasses: 'w-full',
                  name: 'date',
                }}
                inputProps={{
                  containerClasses: 'w-full',
                  inputClasses: 'rounded-xl w-full',
                  placeholder: item.placeholder,
                }}
                datePickerProps={{
                  setter: date =>
                    setValue(item.name as keyof About, date.toISOString(), {
                      shouldDirty: true,
                    }),
                  initialValue: user?.profile?.dob
                    ? new Date(user.profile?.dob as string)
                    : undefined,
                }}
              />
            </div>
          ),
        )}
      </div>
    </form>
  );
}
