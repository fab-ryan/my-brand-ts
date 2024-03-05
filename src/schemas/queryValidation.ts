import { z } from 'zod';

export const QuerySchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const QueryParamsSchema = z.object({
    id: z.string(),
});