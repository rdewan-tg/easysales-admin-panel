import { TransDate } from "@/common/dtos";
import { SiteVisiteReportByDateRangeDetail } from "../../data";

export type MerchandiserReportState = {
  isLoading: boolean;
  siteVisiteReportByDateRangeDetail: SiteVisiteReportByDateRangeDetail[];
  error: string | null;
  transDates: TransDate[];
  getSiteVisiteReportByDateRange: (start: string, end: string) => Promise<void>;
  getTransDates: () => Promise<void>;
};
