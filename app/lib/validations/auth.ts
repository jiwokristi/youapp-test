import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional().nullable().default(null),
  isNewUser: z.boolean().default(false),
  email: z
    .string()
    .min(1, 'Please enter your email')
    .email({ message: 'Please enter a valid email' })
    .default(''),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .default(''),
});

export type User = z.infer<typeof userSchema>;
