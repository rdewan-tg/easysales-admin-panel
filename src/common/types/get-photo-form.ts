import { z } from "zod";

export const getPhotoSchema = z.object({
    deviceId: z.string().optional(), 
    customerChain: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
})

export type GetPhotoForm = z.infer<typeof getPhotoSchema>;