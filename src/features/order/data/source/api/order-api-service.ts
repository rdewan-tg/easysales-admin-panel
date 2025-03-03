import { axiosAdminInstance } from "@/core/data";
import { SalesHeaderDto, SalesHeadersDto, SalesLineDto } from "..";



export const getSalesHeaders = async (): Promise<SalesHeadersDto> => {
    const response = await axiosAdminInstance.get<SalesHeadersDto>(`v1/api/sales-header/find/by-company-id`);
    return response.data;
}

export const getSalesHeaderById = async (salesId: string): Promise<SalesHeaderDto> => {
    const response = await axiosAdminInstance.get<SalesHeaderDto>(`v1/api/sales-header/${salesId}`);
    return response.data;
}

export const getSalesLines = async (salesId: string): Promise<SalesLineDto> => {
    const response = await axiosAdminInstance.get<SalesLineDto>(`v1/api/sales-line/${salesId}`);
    return response.data;
}