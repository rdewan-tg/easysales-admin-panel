import { Photo, PhotoFilterDevice, PhotoFilterTransDate } from "../../data";


export type PhotoState = {
    isLoading: boolean;
    photos: Photo[];
    devices: PhotoFilterDevice[];
    transDates: PhotoFilterTransDate[];
    error: string | null;
    getDevices: () => Promise<void>;
    getTransDates: () => Promise<void>;
    getPhotos: () => Promise<void>;
    findPhotos: (deviceId: string, transDate: string) => Promise<void>;
}