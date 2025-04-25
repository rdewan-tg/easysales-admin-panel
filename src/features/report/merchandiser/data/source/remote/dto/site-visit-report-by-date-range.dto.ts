export interface SiteVisiteReportByDateRangeDto {
  status: string;
  data: SiteVisiteReportByDateRangeData;
}

export interface SiteVisiteReportByDateRangeData {
  totalUniqueVisits: number;
  visitDetails: SiteVisiteReportByDateRangeDetail[];
}

export interface SiteVisiteReportByDateRangeDetail {
  salesPersonCode: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  transDate: string;
  visitCount: number;
}
