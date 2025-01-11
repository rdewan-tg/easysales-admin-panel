import { CreateDeviceSettingForm } from "@/common/types";
import { CreateDeviceSettingDto, DeviceSettingDto, DeviceSettingsDto,} from "../../..";
import { axiosAdminInstance } from "../../../../../../core/data";
import { DeleteDeviceSettingDto} from "../dto/delete-device-setting.dto";
import { UpdateDeviceSettingForm } from "@/common/types/update-device-setting-form";

export const findAll = async () => {
    const response = await axiosAdminInstance.get<DeviceSettingsDto>('/api/v1/admin/device-setting');
    return response.data;
}

export const findById = async (id: number) => {
    const response = await axiosAdminInstance.get<DeviceSettingDto>(`/api/v1/admin/device-setting/${id}`);
    return response.data;
}

export const findByDeviceId = async (deviceId: String) => {
    const response = await axiosAdminInstance.get<DeviceSettingDto>(`/api/v1/device-setting/find/${deviceId}`);
    return response.data;
}

export const createDeviceSetting = async (data: CreateDeviceSettingForm) => {
    const response = await axiosAdminInstance.post<CreateDeviceSettingDto>(`/api/v1/admin/device-setting`, data);
    return response.data;
}

export const updateDeviceSetting = async (data: UpdateDeviceSettingForm) => {
    const response = await axiosAdminInstance.patch<CreateDeviceSettingDto>(`/api/v1/admin/device-setting`, data);
    return response.data;
}


export const deleteDeviceSetting = async (id: number) => {
    console.log('sending delete request');
    
    const response = await axiosAdminInstance.delete<DeleteDeviceSettingDto>(`/api/v1/admin/device-setting/${id}`);
    return response.data;
}
