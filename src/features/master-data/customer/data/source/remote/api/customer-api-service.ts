import { axiosAdminInstance, getCustomersEndpoint } from "@/core/data";
import { CustomerDto } from "../../..";



export const getCustomers = async (dataAreaId: string) => {
    const response = await axiosAdminInstance.get<CustomerDto>(`${getCustomersEndpoint}/${dataAreaId}`);
    return response.data;
}