import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(4, { message: "Name must be at least 4 characters long" }).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirm_password: z.string().min(8).max(20),
    companyId: z.string()
    .transform((value) => {
        return parseInt(value, 10);
    })
    .refine((value) => !isNaN(value), {
        message: "Invalid company ID",
        path: ["companyId"],
    })
})
.refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // This will attach the error to the confirm_password field
});

export type SignupForm = z.infer<typeof signupSchema>;