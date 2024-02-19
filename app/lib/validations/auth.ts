import { z } from 'zod';

export const userDefaults = {
  id: null,
  isNewUser: false,
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
} as User;

export const userAuthSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const userRegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Please enter your email')
      .email({ message: 'Please enter a valid email' }),
    username: z.string().min(1, 'Please enter your username'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      message: 'Passwords must be identical',
      path: ['confirmPassword'],
    },
  );

export type UserAuth = z.infer<typeof userAuthSchema>;
export type UserRegister = z.infer<typeof userRegisterSchema>;
export interface User extends UserAuth, Omit<UserRegister, 'confirmPassword'> {
  id: number | null;
}
