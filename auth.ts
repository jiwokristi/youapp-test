import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { getUser } from '@/lib/actions/user';

import { userAuthSchema } from '@/lib/validations/auth';

import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(
        credentials: Partial<Record<string, unknown>>,
      ): Promise<any> {
        'use server';

        const parsedCredentials = userAuthSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser({ email });

          if (user) {
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password,
            );
            if (passwordsMatch) {
              // * Authenticated.
              return user;
            }
          }
        }

        // ! Invalid credentials.
        return null;
      },
    }),
  ],
});
