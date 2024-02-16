import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/db';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    // ? Expires in 24 hours.
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const protectedSegments = ['booking'];
      const onSignInPage = nextUrl.pathname.startsWith('/sign-in');

      if (isLoggedIn && onSignInPage) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (
        protectedSegments.includes(nextUrl.pathname.split('/').at(-1) as string)
      ) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }

      // ? Fallback: uncomment to authorize users to access other pages (not including protected segments) even if they aren't logged in.
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
