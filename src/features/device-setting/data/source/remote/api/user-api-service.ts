
import { UsersDto } from "../../..";
import { axiosAdminInstance } from "@/core/data/remote/axios-instance";


export const getUsers = async () => {
    const response = await axiosAdminInstance.get<UsersDto>('/api/v1/admin/users');
    return response.data;
}

