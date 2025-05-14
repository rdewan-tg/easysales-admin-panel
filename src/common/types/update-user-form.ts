import { z } from 'zod';

// Define the Zod schema for update user form validation
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long (max 50)" })
    .max(50),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
});

// Define the type for form values based on the Zod schema
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
