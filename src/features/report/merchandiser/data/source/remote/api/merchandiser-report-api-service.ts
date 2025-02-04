import { axiosAdminInstance } from "@/core/data";
import { SiteVisiteReportByDateRangeDto } from "../../..";
import { TransDateDto } from "@/common/dtos";


export const getSiteVisitReportByDateRange = async (start: string, end: string) => {
    const response = await axiosAdminInstance.get<SiteVisiteReportByDateRangeDto>(
        `/api/v1/merchandiser/photo/report/site-visit-report-by-date-range?fromDate=${start}&toDate=${end}`
    );
    
    return response.data;
}

export const getTransDates= async () => {
    const response = await axiosAdminInstance.get<TransDateDto>(`/api/v1/merchandiser/photo/trans-dates`);

    return response.data;
}