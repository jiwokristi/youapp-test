'use client';

import { useContext } from 'react';
import clsx from 'clsx';

import { Input } from '@/components/input';

import { ToastContext } from '@/lib/contexts/toast';

import { aboutFormFields } from '@/lib/constants/form-fields';

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
      {aboutFormFields.map(field => (
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
            placeholder={field.placeholder}
            containerClasses="basis-2/3"
            inputClasses="rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
