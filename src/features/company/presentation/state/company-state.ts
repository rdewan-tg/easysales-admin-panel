import { Company } from "@/common/dtos";


export type CompanyState = {
    isLoading: boolean;
    companies: Company[];
    error: string | null;
    getCompanies: () => Promise<void>;
    createCompany: (data: Company) => Promise<void>;
}