import { Photo, PhotoFilterCustomerChain, PhotoFilterDevice, PhotoFilterTransDate } from "../../data";


export type PhotoState = {
    isLoading: boolean;
    photos: Photo[];
    devices: PhotoFilterDevice[];
    transDates: PhotoFilterTransDate[];
    customerChains: PhotoFilterCustomerChain[];
    error: string | null;
    getDevices: () => Promise<void>;
    getTransDates: () => Promise<void>;
    getCustomerChains: () => Promise<void>;
    getPhotos: () => Promise<void>;
    findPhotosByDeviceId: (fromDate: string, toDate: string, deviceId: string) => Promise<void>;
    findPhotosByFromToDate: (fromDate: string, toDate: string) => Promise<void>;
    findPhotosByCustomerChain: (fromDate: string, toDate: string, customerChain: string) => Promise<void>;
}