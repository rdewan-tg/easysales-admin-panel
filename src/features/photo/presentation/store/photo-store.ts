import { create } from "zustand";
import { findPhotos, getAllPhotos, getDevices, getTransDates} from "../../data";
import { PhotoState } from "../state/photo-state";
import { createSelectors } from "@/core/data";


const usePhotoStore = create<PhotoState>((set) => ({
    isLoading: false,
    photos: [],
    devices: [],
    transDates: [],
    error: null,    
    getDevices: async () => {
        try {
            set({ isLoading: true });
            const response = await getDevices();
            set({ devices: response.data, isLoading: false });
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
    getPhotos: async () => {
        try {
            set({ isLoading: true });
            const response = await getAllPhotos();
            set({ photos: response.data, isLoading: false });
        } catch (error) {    
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    },
    findPhotos: async (deviceId: string, transDate: string) => {
        try {
            set({ isLoading: true });
            const response = await findPhotos(deviceId, transDate);
            set({ photos: response.data, isLoading: false });
        } catch (error) {    
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    }
}));

export default createSelectors(usePhotoStore);