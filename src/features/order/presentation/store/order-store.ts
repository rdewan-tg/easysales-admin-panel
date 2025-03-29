import { create } from "zustand";
import { OrderState } from "../state/order-state";
import { getSalesHeaders, getSalesLinesById } from "../../data/source/api/order-api-service";
import { createSelectors } from "@/core/data";


const useOrderStore = create<OrderState>((set) => ({
    isLoading: false,    
    error: null,
    salesHeaders: [],
    salesHeader: null,
    salesLines: [],
    getSalesHeaders: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await getSalesHeaders();            
            set({ salesHeaders: response.data, isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }

    },
    getSalesLinesById: async (salesId: string) => {
        set({ isLoading: true, error: null });
        try {         
            const response = await getSalesLinesById(salesId);
            set({ salesLines: response.data, isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    }, 
}));

export default createSelectors(useOrderStore);