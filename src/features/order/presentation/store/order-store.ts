import { create } from "zustand";
import { OrderState } from "../state/order-state";
import { exportOrderToCSV, getSalesHeaders, getSalesLinesById } from "../../data/source/api/order-api-service";
import { createSelectors } from "@/core/data";


const useOrderStore = create<OrderState>((set) => ({
    isLoading: false,
    error: null,
    salesHeaders: [],
    salesHeader: null,
    salesLines: [],
    selectedSalesIds: [],
    setSelectedSalesIds: (salesId: string | string[]) => {
        if (Array.isArray(salesId)) {
            // Merge new IDs with existing ones (no duplicates)
            set((state) => ({
                selectedSalesIds: [...new Set([...state.selectedSalesIds, ...salesId])]
            }));
            return;
        }
        set((state) => {
            const selectedSalesIds = state.selectedSalesIds.includes(salesId)
                ? state.selectedSalesIds.filter((id) => id !== salesId)
                : [...state.selectedSalesIds, salesId];
            return { selectedSalesIds };
        });
    },
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
    exportOrderToCSV: async (salesIds: string[]) => {
        try {
            set({ isLoading: true, error: null });
            // call the api to export the sales orders to CSV
            const response = await exportOrderToCSV(salesIds);
            // Generate today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split("T")[0];

            // Define a custom filename
            const filename = `sales_orders_${today}.zip`;

            const bolb = new Blob([response], { type: "application/zip" });
            const url = window.URL.createObjectURL(bolb);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ error: errorMessage });            
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default createSelectors(useOrderStore);