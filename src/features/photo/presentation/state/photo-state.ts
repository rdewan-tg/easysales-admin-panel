import { Photo } from "../../data";


export type PhotoState = {
    isLoading: boolean;
    photos: Photo[];
    error: string | null;
    getPhotos: () => Promise<void>;
}