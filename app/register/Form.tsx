'use client';

import { useState, ReactNode, useContext, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button, Back } from '@/components/button';
import { Input } from '@/components/input';
import { Eye, EyeOff } from '@/components/icons';
import { GoldenUnderline } from '@/components/GoldenUnderline';

import { registerUser } from '@/lib/actions/auth';

import {
  UserRegister,
  userDefaults,
  userRegisterSchema,
} from '@/lib/validations/auth';

import { ToastContext } from '@/lib/contexts/toast';

export default function Form({ children }: { children: ReactNode }) {
  const { onToggle } = useContext(ToastContext);

  const [errorMessage, dispatch] = useFormState(registerUser, undefined);

  const [reveal, setReveal] = useState(false);
  const [revealConfirm, setRevealConfirm] = useState(false);

  const {
    register,
    formState: { errors, isValid },
  } = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: userDefaults,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (errorMessage) {
      onToggle(errorMessage, 'danger', 2000);
    }
  }, [errorMessage, onToggle]);

  return (
    <form
      id="Form__Register"
      noValidate
      className="mx-auto flex w-full max-w-[50rem] flex-col smaller-tablets:-translate-y-96 landscape-tablets:translate-y-0"
      action={dispatch}
    >
      <Back classes="mb-96 -translate-x-12 landscape-tablets:mb-48" />
      {children}
      <Input
        {...register('email')}
        type="email"
        placeholder="Create Email"
        containerClasses="mb-16"
        inputClasses="rounded-xl"
        errorMessage={errors?.email?.message}
      />
      <Input
        {...register('username')}
        placeholder="Create Username"
        containerClasses="mb-16"
        inputClasses="rounded-xl"
        errorMessage={errors?.username?.message}
      />
      <Input
        {...register('password')}
        type={reveal ? 'text' : 'password'}
        placeholder="Create Password"
        endIcon={reveal ? <Eye /> : <EyeOff />}
        containerClasses="mb-16"
        inputClasses="rounded-xl"
        onIconClick={() => setReveal(p => !p)}
        errorMessage={errors?.password?.message}
      />
      <Input
        {...register('confirmPassword')}
        type={revealConfirm ? 'text' : 'password'}
        placeholder="Confirm Password"
        endIcon={revealConfirm ? <Eye /> : <EyeOff />}
        containerClasses="mb-24"
        inputClasses="rounded-xl"
        onIconClick={() => setRevealConfirm(p => !p)}
        errorMessage={errors?.confirmPassword?.message}
      />
      <Button isDisabled={!isValid} classes="rounded-xl mb-48">
        Register
      </Button>
      <p className="text-center text-[1.3rem]">
        <span>Have an account? </span>
        <Link href="/auth" className="text-golden group relative pb-4">
          <span>Login here</span>
          <GoldenUnderline />
        </Link>
      </p>
    </form>
  );
}
