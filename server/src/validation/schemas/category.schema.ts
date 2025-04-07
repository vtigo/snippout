import { z } from "zod"

const categoryBaseSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    color: z.string().optional(),
    user: z.string().min(1),
})

export const createCategorySchema = categoryBaseSchema
export const updateCategorySchema = categoryBaseSchema.partial()