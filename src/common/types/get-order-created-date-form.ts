import { z } from "zod";


export const getOrderCreatedDatesSchema = z.object({
    fromDate: z.string(),
    toDate: z.string(),
})

export type GetOrderCreatedDatesForm = z.infer<typeof getOrderCreatedDatesSchema>;