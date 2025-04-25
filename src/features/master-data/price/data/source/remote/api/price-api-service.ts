import { axiosAdminInstance, getPricesEndpoint } from "@/core/data";
import { PriceDto } from "../../..";

export const getPrices = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<PriceDto>(
    `${getPricesEndpoint}/${dataAreaId}`,
  );
  return response.data;
};
