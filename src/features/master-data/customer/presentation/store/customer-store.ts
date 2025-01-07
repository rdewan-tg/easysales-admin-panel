import { create } from "zustand";
import { CustomerState } from "../state/customer-state";
import { createSelectors } from "@/core/data";
import { getCustomers } from "../../data";



const userCustomer = create<CustomerState>((set) => ({
    customers: [],
    isLoading: false,
    error: null,
    geCustomers: async (dataAreaId: string) => {
        try {
            set({ isLoading: true, error: null });
            const response = await getCustomers(dataAreaId);
            set({ customers: response.data, isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });            
        } 
    },
}));


export default createSelectors(userCustomer);