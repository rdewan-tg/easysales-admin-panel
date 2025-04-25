import { create } from "zustand/react";
import { MerchandiserReportState } from "..";
import { getSiteVisitReportByDateRange, getTransDates } from "../../data";
import { createSelectors } from "@/core/data";

const useMerchandiserReportStore = create<MerchandiserReportState>((set) => ({
  isLoading: false,
  siteVisiteReportByDateRangeDetail: [],
  error: null,
  transDates: [],
  getSiteVisiteReportByDateRange: async (start: string, end: string) => {
    try {
      set({ isLoading: true });
      const response = await getSiteVisitReportByDateRange(start, end);
      set({
        siteVisiteReportByDateRangeDetail: response.data.visitDetails,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  getTransDates: async () => {
    try {
      set({ isLoading: true });
      const response = await getTransDates();
      set({ transDates: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useMerchandiserReportStore);
