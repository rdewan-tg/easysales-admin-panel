import { Company } from "@/common/dtos";
import { CreateCompanyDto } from "../../data";


export type CompanyState = {
    isLoading: boolean;
    companies: Company[];
    error: string | null;
    getCompanies: () => Promise<void>;
    createCompany: (data: CreateCompanyDto) => Promise<void>;
}