import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().optional(),
  color: z.string().optional(),
})

export type CategoryFormData = z.infer<typeof categoryFormSchema>