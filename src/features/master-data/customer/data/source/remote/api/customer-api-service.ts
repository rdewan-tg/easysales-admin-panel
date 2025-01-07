import { axiosAdminInstance } from "@/core/data";
import { CustomerDto } from "../../..";



export const getCustomers = async (dataAreaId: string) => {
    const response = await axiosAdminInstance.get<CustomerDto>(`/api/v1/customers/${dataAreaId}`);
    return response.data;
}