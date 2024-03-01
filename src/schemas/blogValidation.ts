import { z } from 'zod';

export const blogSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, {
        message: 'Title must be at least 3 characters long',
      })
      .max(255),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(10, {
        message: 'Content must be at least 10 characters long',
      }),
    preview: z
      .string({
        required_error: 'Preview is required',
      })
      .min(10, {
        message: 'Preview must be at least 10 characters long',
      }),
  }),
});
