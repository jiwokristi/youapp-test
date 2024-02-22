import { z } from 'zod';

import { heights } from '@/lib/constants/height';
import { weights } from '@/lib/constants/weight';
import { horoscopes } from '@/lib/constants/horoscope';
import { zodiacs } from '@/lib/constants/zodiac';
import { genders } from '@/lib/constants/gender';
import { interests } from '@/lib/constants/dummy/interest';

import { UserAuth, UserRegister } from './auth';

export const aboutSchema = z.object({
  id: z.number().nullish(),
  displayName: z.string().nullish(),
  gender: z.enum(['', ...genders.map(({ value }) => value)]).nullish(),
  dob: z.string().datetime().nullish(),
  horoscope: z.enum(['', ...horoscopes.map(value => value)]).nullish(),
  zodiac: z.enum(['', ...zodiacs.map(value => value)]).nullish(),
  height: z.enum(['', ...heights.map(({ value }) => value)]).nullish(),
  weight: z.enum(['', ...weights.map(({ value }) => value)]).nullish(),
});

export const interestSchema = z.object({
  id: z.number().nullish(),
  userId: z.string().nullish(),
  name: z.enum(['', ...interests.map(({ value }) => value)]).nullish(),
});

export type About = z.infer<typeof aboutSchema>;
export type Interest = z.infer<typeof interestSchema>;
export interface User extends UserAuth, Omit<UserRegister, 'confirmPassword'> {
  id: string | null;
  profile: About | null;
  interest: Interest[];
}
