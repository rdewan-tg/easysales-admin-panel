import { create } from "zustand";
import { MeState } from "../state/me-state";
import { getMe } from "@/features/me/data";
import { createSelectors } from "@/core/data";

const useMeStore = create<MeState>((set) => ({
    isLoading: false,
    me: null,
    error: null,
    getMe: async () => {
        try {
            set({ isLoading: true, error: null });
            const me = await getMe();
            set({ isLoading: false, me: me.data });
        } catch (error) {
            const errorMessage = (error as Error).message;  
            set({ isLoading: false, error: errorMessage });
        }
    }
}))

export default createSelectors(useMeStore);