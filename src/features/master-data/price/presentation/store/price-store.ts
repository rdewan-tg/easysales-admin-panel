import { create } from "zustand";
import { PriceState } from "../state/price-state";
import { createSelectors } from "@/core/data";
import { getPrices } from "../../data";

const usePriceStore = create<PriceState>((set) => ({
  prices: [],
  isLoading: false,
  error: null,
  getprices: async (dataAreaId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await getPrices(dataAreaId);
      set({ prices: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(usePriceStore);
