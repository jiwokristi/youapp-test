import { z } from 'zod';

export const interestSchema = z.object({
  interest: z.array(z.string()),
});

export type Interest = z.infer<typeof interestSchema>;
