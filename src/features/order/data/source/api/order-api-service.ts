import { axiosAdminInstance, findSalesHeaderByCompanyDateRangeEndpoint, findSalesLineByCompanyDateRangeEndpoint, getSalesHeaderByIdEndpoint, getSalesHeadersByCompanyEndpoint, getSalesLinesByIdEndpoint } from "@/core/data";
import { SalesHeaderDto, SalesHeadersDto, SalesLineDto } from "..";



export const getSalesHeaders = async (): Promise<SalesHeadersDto> => {
    const response = await axiosAdminInstance.get<SalesHeadersDto>(getSalesHeadersByCompanyEndpoint);
    return response.data;
}

export const getSalesHeaderById = async (salesId: string): Promise<SalesHeaderDto> => {
    const response = await axiosAdminInstance.get<SalesHeaderDto>(`${getSalesHeaderByIdEndpoint}/${salesId}`);
    return response.data;
}

export const getSalesLinesById = async (salesId: string): Promise<SalesLineDto> => {
    const response = await axiosAdminInstance.get<SalesLineDto>(`${getSalesLinesByIdEndpoint}/${salesId}`);
    return response.data;
}

export const exportSalesHeader = async (data: any): Promise<any> => {
    const response = await axiosAdminInstance.get(findSalesHeaderByCompanyDateRangeEndpoint, { params: data });
    return response.data;
}

export const exportSalesLine = async (data: any): Promise<any> => {
    const response = await axiosAdminInstance.get(findSalesLineByCompanyDateRangeEndpoint, { params: data });
    return response.data;
}