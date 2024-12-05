import { axiosAdminInstance } from "@/core/data";
import { CompanyDto } from "@/features/user/data";


export const getCompanies = async () => {
    const response = await axiosAdminInstance.get<CompanyDto>('/api/v1/company');
    return response.data;
}
