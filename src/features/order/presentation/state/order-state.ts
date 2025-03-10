import { SalesHeaderData, SalesLineData } from "../../data/source";

export type OrderState = {
    isLoading: boolean;    
    error: string | null;
    salesHeaders: SalesHeaderData[];
    salesHeader: SalesHeaderData | null;
    salesLines: SalesLineData[];
    getSalesHeaders: () => Promise<void>;
    getSalesLines: (salesId: string) => Promise<void>;
}