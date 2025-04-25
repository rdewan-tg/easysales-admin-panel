import { axiosAdminInstance, getItemsEndpoint } from "@/core/data";
import { ItemDto } from "../../..";

export const getItems = async (dataAreaId: string) => {
  const response = await axiosAdminInstance.get<ItemDto>(
    `${getItemsEndpoint}/${dataAreaId}`,
  );
  return response.data;
};
