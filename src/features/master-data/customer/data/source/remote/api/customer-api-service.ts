import { axiosAdminInstance } from "@/core/data";
import { MerchandiserCustomerDto } from "../dto/merchandiser-customer.dto";


export const getMerchandiserCustomers = async (dataAreaId: string) => {
    const response = await axiosAdminInstance.get<MerchandiserCustomerDto>(`/api/v1/getCustomerByDataAreaId/${dataAreaId}`);
    return response.data;
}