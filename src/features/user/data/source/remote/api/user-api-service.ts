import { UserDto, UsersDto } from "../../..";
import { axiosAdminInstance } from "../../../../../../core/data";
import { DeleteUserDto } from "../dto/delete-user.dto";

export const getUsersByCompany = async () => {
    const response = await axiosAdminInstance.get<UsersDto>('/api/v1/admin/users');
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await axiosAdminInstance.get<UserDto>(`/api/v1/admin/users/${id}`);
    return response.data;
}

export const deleteUser = async (id: number) => {
    const response = await axiosAdminInstance.delete<DeleteUserDto>(`/api/v1/admin/users/${id}`);
    return response.data;
}
