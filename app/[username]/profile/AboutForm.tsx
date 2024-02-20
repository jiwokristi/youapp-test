'use client';

import { useContext } from 'react';
import clsx from 'clsx';

import { Input } from '@/components/input';
import { Select } from '@/components/Select';

import { ToastContext } from '@/lib/contexts/toast';

import { aboutFormFields } from '@/lib/constants/form-fields';
import { selectStyles } from '@/lib/constants/variants/select';

export default function AboutForm() {
  const { fields } = useContext(ToastContext);

  const isShow = fields.includes('about');

  return (
    <div
      className={clsx('flex flex-col gap-16 transition-all ease-in', {
        'max-h-[43rem] pb-24': isShow,
        'max-h-0': !isShow,
      })}
    >
      {aboutFormFields.map(field =>
        field.type === 'text' ? (
          <div
            key={field.id}
            className={clsx(
              'flex items-center justify-between gap-8 transition-all ease-in',
              {
                'max-h-0 opacity-0': !isShow,
                'opacity-100': isShow,
              },
            )}
          >
            <label
              htmlFor={field.name}
              className="basis-1/3 text-[1.3rem] opacity-30"
            >
              {field.label}
            </label>
            <Input
              variant="outlined"
              color="white"
              size="sm"
              align="right"
              readOnly={field.name === 'horoscope' || field.name === 'zodiac'}
              placeholder={
                field.name === 'horoscope'
                  ? '--'
                  : field.name === 'zodiac'
                    ? '--'
                    : field.placeholder
              }
              containerClasses="basis-2/3"
              inputClasses="rounded-xl"
            />
          </div>
        ) : (
          <div
            key={field.id}
            className={clsx(
              'flex items-center justify-between gap-8 transition-all ease-in',
              {
                'max-h-0 opacity-0': !isShow,
                'opacity-100': isShow,
              },
            )}
          >
            <label
              htmlFor={field.name}
              className="basis-1/3 text-[1.3rem] opacity-30"
            >
              {field.label}
            </label>
            <Select
              options={field.options}
              classes="basis-2/3 text-[1.3rem] text-right"
              placeholder={field.placeholder}
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
                    transform: isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                }),
              }}
            />
          </div>
        ),
      )}
    </div>
  );
}
