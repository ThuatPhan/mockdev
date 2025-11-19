import { z } from 'zod'

export const projectSchema = z.object({
  name: z
    .string({ error: 'Project name is required' })
    .trim()
    .min(3, 'Project name must be at least 3 characters')
    .max(50, 'Project name is too long'),

  apiPrefix: z
    .string()
    .trim()
    .refine((val) => !val.includes(' '), {
      message: 'API Prefix must not contain spaces'
    })
    .refine((val) => val.startsWith('/'), {
      message: "API Prefix must start with '/' (e.g., /api/v1)"
    })
    .regex(new RegExp('^[a-zA-Z0-9_/-]+$'), {
      message: "API Prefix can only contain letters, numbers, '-', '_', and '/'"
    })
    .refine((val) => val === '/' || !val.endsWith('/'), {
      message: "API Prefix should not end with '/'"
    })
    .optional()
})

export type ProjectInput = z.infer<typeof projectSchema>
