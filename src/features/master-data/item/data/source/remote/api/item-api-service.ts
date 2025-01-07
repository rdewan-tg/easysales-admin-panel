import { axiosAdminInstance } from "@/core/data";
import { ItemDto } from "../../..";




export const getItems = async (dataAreaId: string) => {
    const response = await axiosAdminInstance.get<ItemDto>(`/api/v1/items/${dataAreaId}`);
    return response.data;
}