'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Option, Select } from '@/components/Select';

import { Interest, interestSchema } from '@/lib/validations/user';

import { interests } from '@/lib/constants/dummy/interest';

export default function Form({ initialValues }: { initialValues: Interest[] }) {
  const { control } = useForm<Interest>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  return (
    <div className="mx-auto flex w-full max-w-[50rem] flex-col smaller-tablets:-translate-y-96 landscape-tablets:translate-y-0">
      <Controller
        name="name"
        control={control}
        render={({ field }) => {
          return (
            <Select<Option, true>
              isMulti
              name="name"
              options={interests}
              defaultValue={initialValues?.map(({ name }) => ({
                label: name,
                value: name,
              }))}
              onChange={option => {
                field.onChange((option as Option[]).map(({ value }) => value));
              }}
            />
          );
        }}
      />
    </div>
  );
}
