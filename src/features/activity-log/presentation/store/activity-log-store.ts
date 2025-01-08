import { create } from "zustand";
import { ActivityLogState } from "../state/activity-log-state";
import { createSelectors } from "@/core/data";
import { ActivityLog, createActivityLog, getActivityLogs} from "../../data";



const useActivityLogStore = create<ActivityLogState>((set) => ({
    logs: [],
    isLoading: false,
    error: null,
    getActivityLogs: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getActivityLogs();
            set({ logs: response.data, isLoading: false, error: null });
        } catch (error) {
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    },
    createActivityLog: async (data: ActivityLog) => {
        try {
            set({ isLoading: true, error: null });
            await createActivityLog(data);
            set({ isLoading: false, error: null });
        } catch (error) {       
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    }
}));


export default createSelectors(useActivityLogStore);