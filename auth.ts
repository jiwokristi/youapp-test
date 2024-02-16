'use server';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

import { getUser, signUp } from '@/lib/actions/auth';

import { userSchema } from '@/lib/validations/auth';

import { authConfig } from './auth.config';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(
        credentials: Partial<Record<string, unknown>>,
      ): Promise<any> {
        const parsedCredentials = userSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
          // ? When retrieving data from a FormData object in JavaScript, all values are treated as strings (true becomes "true"/false becomes "false"). This behavior occurs because the FormData API converts values to strings when appending them to the FormData object.
          isNewUser: JSON.parse(credentials.isNewUser as string),
        });

        if (parsedCredentials.success) {
          const { email, password, isNewUser } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user && isNewUser) {
            const user = await signUp(parsedCredentials.data);
            return user;
          } else if (user) {
            if (password) {
              const passwordsMatch = await bcrypt.compare(
                password,
                user.password as string,
              );
              if (passwordsMatch) {
                // * Authenticated.
                return user;
              }
            }
          }
        }

        // ! Invalid credentials.
        return null;
      },
    }),
  ],
});
