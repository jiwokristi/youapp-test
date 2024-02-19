'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Select } from '@/components/Select';

import { Interest, interestSchema } from '@/lib/validations/profile';

import { interests } from '@/lib/constants/dummy/interest';

export default function Form() {
  const {
    setValue,
    formState: { errors, isValid },
  } = useForm<Interest>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interest: [],
    },
    mode: 'onTouched',
  });

  return (
    <form
      id="Form__Interest"
      noValidate
      className="mx-auto flex w-full max-w-[50rem] flex-col smaller-tablets:-translate-y-96 landscape-tablets:translate-y-0"
    >
      <Select options={interests} isMulti />
    </form>
  );
}
