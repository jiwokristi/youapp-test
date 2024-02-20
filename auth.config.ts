import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/lib/db';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const protectedSegments = ['profile', 'interest'];
      const onAuthPage = nextUrl.pathname.startsWith('/auth');
      const onRegisterPage = nextUrl.pathname.startsWith('/register');

      if (isLoggedIn && (onAuthPage || onRegisterPage)) {
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

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
