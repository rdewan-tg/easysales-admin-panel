import {
  axiosAdminInstance,
  getMerchandiserCustomersEndpoint,
} from "@/core/data";
import { MerchandiserCustomerDto } from "../dto/merchandiser-customer.dto";

export const getMerchandiserCustomers = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<MerchandiserCustomerDto>(
    `${getMerchandiserCustomersEndpoint}/${dataAreaId}`,
  );
  return response.data;
};
