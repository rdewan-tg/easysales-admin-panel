
import { createSelectors } from "@/core/data";
import { create } from "zustand";
import { CompanyState } from "../state/company-state";
import { Company, getCompanies } from "@/features/user/data";
import { createCompany } from "../../data/source/remote/api/company-api-service";


const useCompanyStore = create<CompanyState>((set, get) => ({
    companies: [],
    isLoading: false,
    error: null,
    getCompanies: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getCompanies();
            set({ companies: response.data, isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    },
    createCompany: async (data: Company) : Promise<void> => {
        try {
            set({ isLoading: true, error: null });
            await createCompany(data);
            set({ isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    },
    
}))

export default createSelectors(useCompanyStore);