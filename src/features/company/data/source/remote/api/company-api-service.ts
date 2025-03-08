import { axiosAdminInstance, createCompanyEndpoint, getCompaniesEndpoint } from "@/core/data";
import { CompanyDto } from "@/features/user/data";


export const getCompanies = async () => {
    const response = await axiosAdminInstance.get<CompanyDto>(getCompaniesEndpoint);
    return response.data;
}

export const createCompany = async (data: any) => {
    const response = await axiosAdminInstance.post<CompanyDto>(createCompanyEndpoint, data);
    return response.data;
}