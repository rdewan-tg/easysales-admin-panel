import { axiosAdminInstance } from "@/core/data";
import { CustomerAddressDto } from "../../..";


export async function getCustomerAddress(dataAreaId: string) {
    const response = await axiosAdminInstance.get<CustomerAddressDto>(`/api/v1/addresses/${dataAreaId}`);
    return response.data;
}