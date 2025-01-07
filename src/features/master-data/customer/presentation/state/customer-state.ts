import { Customer } from "../../data"



export type CustomerState = {
    customers: Customer[]
    isLoading: boolean
    error: string | null
    geCustomers: (dataAreaId: string) => Promise<void>
}