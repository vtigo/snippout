import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required." })
    .transform(value => value.trim()),

  password: z.string()
    .min(1, { message: "Password is required." }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>
