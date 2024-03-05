import { z } from 'zod';

export const commentValidation = z.object({
  comment: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1),
});
