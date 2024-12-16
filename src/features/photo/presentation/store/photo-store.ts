import { create } from "zustand";
import { getAllPhtos } from "../../data";
import { PhotoState } from "../state/photo-state";
import { createSelectors } from "@/core/data";


const usePhotoStore = create<PhotoState>((set) => ({
    isLoading: false,
    photos: [],
    error: null,    
    getPhotos: async () => {
        try {
            set({ isLoading: true });
            const response = await getAllPhtos();
            set({ photos: response.data, isLoading: false });
        } catch (error) {    
            const errorMessage = (error as Error).message;
            set({ isLoading: false, error: errorMessage });
        }
    }
}));

export default createSelectors(usePhotoStore);