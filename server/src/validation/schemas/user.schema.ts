import { z } from "zod"

const userBaseSchema = z.object({ 
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export const createUserSchema = userBaseSchema
export const updateUserSchema = userBaseSchema.partial()
