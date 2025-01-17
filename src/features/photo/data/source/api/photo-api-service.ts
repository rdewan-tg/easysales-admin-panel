import { axiosAdminInstance } from "@/core/data";
import { PhotoDto, PhotoFilterDeviceDto, PhotoFilterTransDateDto } from "../..";


export const getAllPhotos = async () => {
    const response = await axiosAdminInstance.get<PhotoDto>('/api/v1/merchandiser/photo');
    return response.data;
}

export const findPhotos = async (deviceId: string, transDate: string) => {
    const response = await axiosAdminInstance.get<PhotoDto>(`/api/v1/merchandiser/photo/find`, {
        params: { deviceId: deviceId, transDate: transDate },
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
