import countriesData from '@/shared/data/countries.json';
import z from 'zod';

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .regex(/^[A-Z].*$/, 'Name must start with an uppercase letter'),
    age: z.coerce.number().int().min(13, 'Age must be at least 13'),
    email: z.email('Invalid email addres'),
    gender: z.enum(['male', 'female', 'other'], {
      error: 'Please pick your gender',
    }),
    country: z.enum(
      countriesData.map((c) => c.code),
      'Please select a country'
    ),
    confirmPassword: z.string(),
    password: z
      .string()
      .min(4, 'Password must be at least 4 characters long')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    tos: z.coerce.boolean().refine((value) => value, {
      error: 'You must agree with the terms of service',
    }),
    pfp: z.instanceof(File).nullable(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'],
  })
  .refine(({ pfp }) => pfp && pfp.size <= 2 * 1024 * 1024, {
    error: 'File size must be less than 2MB',
    path: ['pfp'],
  })
  .refine(
    ({ pfp }) =>
      ['image/jpg', 'image/jpeg', 'image/png'].includes(pfp?.type || ''),
    {
      error: 'File extension must be .jpg, .jpeg, or .png',
      path: ['pfp'],
    }
  );

export type SignupFormData = z.infer<typeof signupFormSchema>;
