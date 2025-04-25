import { GetOrderCreatedDatesForm } from "@/common/types/get-order-created-date-form";
import {
  ExportOrderToCSVDto,
  OrderCreatedDate,
  SalesHeaderData,
  SalesLineData,
} from "../../data/source";

export type OrderState = {
  isLoading: boolean;
  error: string | null;
  salesHeaders: SalesHeaderData[];
  salesHeader: SalesHeaderData | null;
  salesLines: SalesLineData[];
  selectedSalesIds: string[];
  orderCreatedDates: OrderCreatedDate[];
  getSalesHeaders: () => Promise<void>;
  getSalesHeaderByCompanyDateRange: (
    data: GetOrderCreatedDatesForm,
  ) => Promise<void>;
  getSalesLinesById: (salesId: string) => Promise<void>;
  setSelectedSalesIds: (salesId: string | string[]) => void;
  exportOrderToCSV: (data: ExportOrderToCSVDto) => Promise<void>;
  getOrderCreatedDates: () => Promise<void>;
};
