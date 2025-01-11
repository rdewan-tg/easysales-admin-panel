import { CompanyDto } from "@/common/dtos";
import { axiosAdminInstance } from "@/core/data";



export const getCompanies = async () => {
    const response = await axiosAdminInstance.get<CompanyDto>('/api/v1/company');
    return response.data;
}
