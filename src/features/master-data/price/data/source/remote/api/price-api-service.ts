import { axiosAdminInstance } from "@/core/data";
import { PriceDto } from "../../..";




export const getPrices = async (dataAreaId: string) => {
    const response = await axiosAdminInstance.get<PriceDto>(`/api/v1/prices/${dataAreaId}`);
    return response.data;
}