import { create } from "zustand";
import { OrderState } from "../state/order-state";
import { exportOrderToCSV, getSalesHeaders, getSalesLinesById } from "../../data/source/api/order-api-service";
import { createSelectors } from "@/core/data";
import { ExportOrderToCSVDto } from "../../data/source";


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
    exportOrderToCSV: async (data: ExportOrderToCSVDto) => {
        try {
            // Set loading state to true and clear any previous errors
            set({ isLoading: true, error: null });
            
            // Call the API endpoint to export the sales orders to CSV format
            const response = await exportOrderToCSV(data);
            
            // Get current date and format it as YYYY-MM-DD
            const today = new Date().toISOString().split("T")[0];
    
            // Create a filename with today's date and .zip extension
            const filename = `sales_orders_${today}.zip`;
    
            // Create a Blob object from the response data with zip MIME type
            const bolb = new Blob([response], { type: "application/zip" });
            
            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(bolb);
            
            // Create an anchor element for downloading
            const a = document.createElement("a");
            
            // Set the anchor's href to the Blob URL
            a.href = url;
            
            // Set the download attribute with our custom filename
            a.download = filename;
            
            // Append the anchor to the document body (required for Firefox)
            document.body.appendChild(a);
            
            // Programmatically click the anchor to trigger download
            a.click();
            
            // Clean up by revoking the Blob URL
            window.URL.revokeObjectURL(url);
        } catch (error) {
            // If error occurs, extract the error message and set it in state
            const errorMessage = (error as Error).message;
            set({ error: errorMessage });            
        } finally {
            // Regardless of success or failure, set loading to false
            set({ isLoading: false });
        }
    }

}));

export default createSelectors(useOrderStore);