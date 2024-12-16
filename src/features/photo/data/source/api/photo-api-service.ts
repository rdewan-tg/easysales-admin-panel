import { axiosAdminInstance } from "@/core/data";
import { PhotoDto } from "../..";


export const getAllPhtos = async () => {
    const response = await axiosAdminInstance.get<PhotoDto>('/api/v1/merchandiser/photo');
    return response.data;
}