'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import prisma from '@/lib/db';

import { hashPassword } from '@/lib/helpers/hash';

import { signIn, signOut } from '../../../auth';

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username: email,
          },
        ],
      },
    });

    return user;
  } catch (error) {
    console.log('ERROR GET USER ----->', error);
  }
};

export const registerUser = async (
  state: string | undefined,
  formData: FormData,
) => {
  try {
    const payload = Object.fromEntries(formData.entries());
    const hashedPassword = await hashPassword(payload.password as string);
    const user = await prisma.user.create({
      data: {
        email: payload.email as string,
        username: payload.username as string,
        password: hashedPassword as string,
      },
    });

    if (user) {
      await signIn('credentials', {
        email: payload.email,
        password: payload.password,
      });
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        if ((error.meta?.target as string[])[0] === 'username') {
          return 'Sorry, that username is already in use.';
        }
        return 'Sorry, that email is already in use.';
      }
    } else if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'Oops! It looks like there might be a typo in your email or password.';
      }
      return 'We apologize, but it appears that something unexpected occurred.';
    }
  }

  redirect(`/${formData.get('username')}/profile`);
};

export const authenticateUser = async (
  state: string | undefined,
  formData: FormData | { email: string; password: string },
) => {
  try {
    let credentials;

    if (formData instanceof FormData) {
      credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
      };
    } else {
      credentials = formData;
    }

    await signIn('credentials', credentials);
  } catch (error) {
    console.log('ERROR ----->', error);
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'Oops! It looks like there might be a typo in your email or password.';
      }
      return 'We apologize, but it appears that something unexpected occurred.';
    }
  }

  if (formData instanceof FormData) {
    const url = `${(formData.get('email') as string).split('@')[0]}/profile`;
    redirect(url);
  }
  redirect(`/${formData.email.split('@')[0]}/profile`);
};

export const signOutUser = async () => {
  await signOut();
};
