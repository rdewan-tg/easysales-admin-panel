import {
  axiosAdminInstance,
  getSiteVisitReportByDateRangeEndpoint,
  getPhotoTransDatesEndpoint,
} from "@/core/data";
import { SiteVisiteReportByDateRangeDto } from "../../..";
import { TransDateDto } from "@/common/dtos";

export const getSiteVisitReportByDateRange = async (
  start: string,
  end: string,
) => {
  const response = await axiosAdminInstance.get<SiteVisiteReportByDateRangeDto>(
    `${getSiteVisitReportByDateRangeEndpoint}?fromDate=${start}&toDate=${end}`,
  );

  return response.data;
};

export const getTransDates = async () => {
  const response = await axiosAdminInstance.get<TransDateDto>(
    getPhotoTransDatesEndpoint,
  );

  return response.data;
};
