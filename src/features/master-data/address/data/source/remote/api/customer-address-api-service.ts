import { axiosAdminInstance, getCustomerAddressEndpoint } from "@/core/data";
import { CustomerAddressDto } from "../../..";

export async function getCustomerAddress(dataAreaId: string) {
  const response = await axiosAdminInstance.get<CustomerAddressDto>(
    `${getCustomerAddressEndpoint}/${dataAreaId}`,
  );
  return response.data;
}
