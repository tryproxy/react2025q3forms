import z from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .regex(/^[A-Z].*$/, 'Name must start with an uppercase letter'),
  age: z.coerce.number().int().min(13, 'Age must be at least 13'),
});

export type SignupData = z.infer<typeof signupSchema>;
