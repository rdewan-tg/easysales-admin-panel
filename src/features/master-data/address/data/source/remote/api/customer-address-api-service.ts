import { axiosAdminInstance, getCustomerAddressEndpoint } from "@/core/data";
import { CustomerAddressDto } from "../../..";

export async function getCustomerAddress(dataAreaId: string, page: number, size: number) {
  const response = await axiosAdminInstance.get<CustomerAddressDto>(
    `${getCustomerAddressEndpoint}/${dataAreaId}?page=${page}&pageSize=${size}`,
  );
  return response.data;
}
