import { axiosAdminInstance } from "@/core/data";
import { PhotoDto, PhotoFilterCustomerChainDto, PhotoFilterDeviceDto, PhotoFilterTransDateDto } from "../../..";


export const getAllPhotos = async () => {
    const response = await axiosAdminInstance.get<PhotoDto>('/api/v1/merchandiser/photo');
    return response.data;
}

export const findPhotosByDeviceId = async (fromDate: string, toDate: string, deviceId: string) => {
    const response = await axiosAdminInstance.get<PhotoDto>(`/api/v1/merchandiser/photo/find-by-device-and-date`, {
        params: { fromDate: fromDate, toDate: toDate, deviceId: deviceId },
    },);

    return response.data;

}

export const findPhotosByFromToDate = async (fromDate: string, toDate: string) => {
    const response = await axiosAdminInstance.get<PhotoDto>(`/api/v1/merchandiser/photo/find-by-from-and-to-date`, {
        params: { fromDate: fromDate, toDate: toDate },
    },);

    return response.data;

}

export const findPhotosByCustomerChain = async (fromDate: string, toDate: string, customerChain: string) => {
    const response = await axiosAdminInstance.get<PhotoDto>(`/api/v1/merchandiser/photo/find-by-customer-chain-and-date`, {
        params: { fromDate: fromDate, toDate: toDate, customerChain: customerChain },
    },);

    return response.data;

}

export const getDevices = async () => {
    const response = await axiosAdminInstance.get<PhotoFilterDeviceDto>(`/api/v1/merchandiser/photo/devices`);

    return response.data;

}

export const getTransDates= async () => {
    const response = await axiosAdminInstance.get<PhotoFilterTransDateDto>(`/api/v1/merchandiser/photo/trans-dates`);

    return response.data;
}

export const getCustomerChains= async () => {
    const response = await axiosAdminInstance.get<PhotoFilterCustomerChainDto>(`/api/v1/merchandiser/photo/customer-chains`);

    return response.data;
}
