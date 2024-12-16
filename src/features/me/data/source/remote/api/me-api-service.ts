import { axiosAdminInstance } from "@/core/data";
import { MeDto } from "@/features/me/data";



export const getMe = async () => {
    const response = await axiosAdminInstance.get<MeDto>('/api/v1/me');
    return response.data;
}