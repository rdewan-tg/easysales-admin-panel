import { ExportOrderToCSVDto,  SalesHeaderData, SalesLineData } from "../../data/source";

export type OrderState = {
    isLoading: boolean;    
    error: string | null;
    salesHeaders: SalesHeaderData[];
    salesHeader: SalesHeaderData | null;
    salesLines: SalesLineData[];
    selectedSalesIds: string[];
    getSalesHeaders: () => Promise<void>;
    getSalesLinesById: (salesId: string) => Promise<void>;
    setSelectedSalesIds: (salesId: string | string[]) => void;
    exportOrderToCSV: (data: ExportOrderToCSVDto) => Promise<void>;
}