import { z } from "zod";
import { Types } from "mongoose";

const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

export const idParamSchema = z.object({
  id: z.string().refine(isValidObjectId, {
    message: 'Invalid ID format'
  })
});