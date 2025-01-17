import { z } from "zod";

export const getPhotoSchema = z.object({
    transDate: z.string(),
    deviceId: z.string(), 
})

export type GetPhotoForm = z.infer<typeof getPhotoSchema>;