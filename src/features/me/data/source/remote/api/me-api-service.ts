import { axiosAdminInstance, getMeEndpoint } from "@/core/data";
import { MeDto } from "@/features/me/data";



export const getMe = async () => {
    const response = await axiosAdminInstance.get<MeDto>(getMeEndpoint);
    return response.data;
}