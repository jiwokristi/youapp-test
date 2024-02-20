import { AuthError } from 'next-auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

/**
 *  @param {Error} error
 *  The error you get in a catch block.
 *
 *  @returns {string}
 *  The string of the custom error message.
 */

export const errorHandler = (error: Error): string | undefined => {
  if (error instanceof AuthError) {
    if (error.type === 'CredentialsSignin') {
      return 'Oops! It looks like there might be a typo in your email or password.';
    }
    return 'We apologize, but it appears that something unexpected occurred.';
  } else if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      switch ((error.meta?.target as string[])[0]) {
        case 'username':
          return 'Sorry, that username is already in use.';
        case 'email':
          return 'Sorry, that email is already in use.';

        default:
          break;
      }
    }
    return 'We apologize, but it appears that something unexpected occurred.';
  }
};
