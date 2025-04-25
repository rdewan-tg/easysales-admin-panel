import {
  axiosAdminInstance,
  exportOrderToCSVEndpoint,
  findSalesHeaderByCompanyDateRangeEndpoint,
  findSalesLineByCompanyDateRangeEndpoint,
  getSalesHeaderByIdEndpoint,
  getSalesHeadersByCompanyEndpoint,
  getSalesLinesByIdEndpoint,
  OrderCreatedDateEndpoint,
} from "@/core/data";
import {
  ExportOrderToCSVDto,
  OrderCreatedDateDto,
  SalesHeaderDto,
  SalesHeadersDto,
  SalesLineDto,
} from "..";
import { GetOrderCreatedDatesForm } from "@/common/types/get-order-created-date-form";

export const getSalesHeaders = async (): Promise<SalesHeadersDto> => {
  const response = await axiosAdminInstance.get<SalesHeadersDto>(
    getSalesHeadersByCompanyEndpoint,
  );
  return response.data;
};

export const getSalesHeaderByCompanyDateRange = async (
  data: GetOrderCreatedDatesForm,
): Promise<SalesHeadersDto> => {
  const response = await axiosAdminInstance.get<SalesHeadersDto>(
    findSalesHeaderByCompanyDateRangeEndpoint,
    { params: data },
  );
  return response.data;
};

export const getSalesHeaderById = async (
  salesId: string,
): Promise<SalesHeaderDto> => {
  const response = await axiosAdminInstance.get<SalesHeaderDto>(
    `${getSalesHeaderByIdEndpoint}/${salesId}`,
  );
  return response.data;
};

export const getSalesLinesById = async (
  salesId: string,
): Promise<SalesLineDto> => {
  const response = await axiosAdminInstance.get<SalesLineDto>(
    `${getSalesLinesByIdEndpoint}/${salesId}`,
  );
  return response.data;
};

export const exportSalesHeader = async (data: any): Promise<any> => {
  const response = await axiosAdminInstance.get(
    findSalesHeaderByCompanyDateRangeEndpoint,
    { params: data },
  );
  return response.data;
};

export const exportSalesLine = async (data: any): Promise<any> => {
  const response = await axiosAdminInstance.get(
    findSalesLineByCompanyDateRangeEndpoint,
    { params: data },
  );
  return response.data;
};

export const exportOrderToCSV = async (
  data: ExportOrderToCSVDto,
): Promise<any> => {
  const response = await axiosAdminInstance.post(
    exportOrderToCSVEndpoint,
    data,
    { responseType: "blob" },
  );
  return response.data;
};

export const getOrderCreatedDates = async () => {
  const response = await axiosAdminInstance.get<OrderCreatedDateDto>(
    OrderCreatedDateEndpoint,
  );
  return response.data;
};
