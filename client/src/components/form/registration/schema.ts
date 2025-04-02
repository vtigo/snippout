import { z } from "zod";

export const registrationFormSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, underscores, and hyphens."
    }),

  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .toLowerCase(),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password is too long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),

  confirmPassword: z.string()
    .min(1, { message: "Please confirm your password." })
})
  .refine(
    (data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"]
  }
  );

export type RegistrationFormData = z.infer<typeof registrationFormSchema>