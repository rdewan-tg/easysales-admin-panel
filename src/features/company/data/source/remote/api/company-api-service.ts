import { axiosAdminInstance } from "@/core/data";
import { CompanyDto } from "@/features/user/data";


export const getCompanies = async () => {
    const response = await axiosAdminInstance.get<CompanyDto>('/api/v1/company');
    return response.data;
}

export const createCompany = async (data: any) => {
    const response = await axiosAdminInstance.post<CompanyDto>('/api/v1/company', data);
    return response.data;
}