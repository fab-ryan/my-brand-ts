import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({
      required_error: 'Category name is required and should be a string',
    })
    .nonempty(),
});

export const categoryQuerySchema = z.object({
  status: z.string().optional(),
});

export const projectSchema = z.object({
  title: z
    .string({
      required_error: 'Project title is required and should be a string',
    })
    .nonempty(),
  description: z
    .string({
      required_error: 'Project description is required and should be a string',
    })
    .nonempty(),
  category: z.string({
    required_error: 'Project category is required and should be a string',
  }),
  url: z
    .string({
      required_error: 'Project url is required and should be a string',
    })
    .nonempty(),
  status: z.boolean().optional(),
});

export const educationSchema = z.object({
  institution: z
    .string({
      required_error: 'School name is required and should be a string',
    })
    .nonempty(),
  degree: z
    .string({
      required_error: 'Degree name is required and should be a string',
    })
    .nonempty(),
  field: z
    .string({
      required_error: 'Field name is required and should be a string',
    })
    .nonempty(),
  start: z
    .string({
      required_error: 'Start year is required and should be a string',
    })
    .nonempty(),
  end: z
    .string({
      required_error: 'End year is required and should be a string',
    })
    .nonempty(),
  description: z.string().optional(),
  status: z.boolean().optional(),
});


export const skillSchema = z.object({
    name: z
        .string({
        required_error: 'Skill name is required and should be a string',
        })
        .nonempty(),
    percent: z
        .number({
        required_error: 'Skill percentage is required and should be a number',
        })
        .int()
        .min(1, 'Skill percentage should be between 1 and 100')
        .max(100, 'Skill percentage should be between 1 and 100'),
    status: z.boolean().optional(),
});