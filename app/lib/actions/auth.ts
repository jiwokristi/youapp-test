'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';

import { User } from '@/lib/validations/auth';

import { hashPassword } from '@/lib/helpers/hash';

import { signIn } from '../../../auth';
import { ErrorState } from '../constants/error-state';

export const getUser = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user as User;
  } catch (error) {
    console.error('ERROR:', error);
    return null;
  }
};

export const signUp = async (payload: User): Promise<User | null> => {
  try {
    const hashedPassword = await hashPassword(payload.password);
    const user = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        isNewUser: payload.isNewUser,
      },
    });

    return user as User;
  } catch (error) {
    console.error('ERROR:', error);
    return null;
  }
};

export async function authenticate(prevState: ErrorState, formData: FormData) {
  try {
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
      // ? When a boolean value is true FormData API converts it to "on" and when the value is false it will be converted to null. Do this to convert it to boolean.
      isNewUser: !!formData.get('isNewUser'),
    };

    await signIn('credentials', credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { code: 401, message: 'Invalid credentials' } as ErrorState;
        default:
          return { code: 500, message: 'Internal server error' } as ErrorState;
      }
    }
  }

  // ? Redirect works by throwing an error, which would be caught by the catch block. To avoid this, you can call redirect after try/catch. redirect would only be reachable if try is successful.
  redirect('/');
}
