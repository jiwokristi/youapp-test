'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/button';
import { Input, Checkbox } from '@/components/input';

import { authenticate } from '@/lib/actions/auth';

import { User, userSchema } from '@/lib/validations/auth';

export default function Form() {
  const [reveal, setReveal] = useState(false);

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const {
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form
      id="Form__SignIn"
      noValidate
      className="mx-auto flex w-full flex-col px-32 py-48 smaller-tablets:w-[90%] smaller-tablets:max-w-[65rem] smaller-tablets:px-0 smaller-tablets:py-64 tablets:max-w-[75.2rem] tablets:py-96"
      action={dispatch}
    >
      <Input
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Email"
        containerClasses="mb-[4rem]"
        inputClasses="rounded-md"
        onChange={e =>
          setValue('email', e.target.value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
          })
        }
        errorMessage={errors?.email?.message}
      />
      <Input
        {...register('password')}
        type={reveal ? 'text' : 'password'}
        label="Password"
        placeholder="Password"
        endIcon={
          reveal ? (
            <Eye width={16} height={16} />
          ) : (
            <EyeOff width={16} height={16} />
          )
        }
        containerClasses="mb-16"
        inputClasses="rounded-md"
        onChange={e =>
          setValue('password', e.target.value, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
          })
        }
        onIconClick={() => setReveal(prev => !prev)}
        errorMessage={errors?.password?.message}
      />
      <Link
        href="#"
        className="mb-24 w-fit border-b-2 border-transparent pb-4 text-14 text-primary-shade-2 transition-all hover:border-primary-shade-2"
      >
        Forgotten password?
      </Link>
      <Checkbox
        {...register('isNewUser')}
        label="Make me a new account"
        direction="row"
        containerClasses="mb-48"
        onChange={e =>
          setValue('isNewUser', e.target.checked, {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true,
          })
        }
      />
      <Button isDisabled={!isValid} classes="rounded-t-2xl">
        SIGN IN
      </Button>
      <Button
        type="button"
        variant="outlined"
        classes="rounded-b-2xl"
        onClick={() =>
          signIn('google', {
            callbackUrl: 'http://localhost:8000/',
          })
        }
      >
        SIGN IN WITH GOOGLE
      </Button>
    </form>
  );
}
