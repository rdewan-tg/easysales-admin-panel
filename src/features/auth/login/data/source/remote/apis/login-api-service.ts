
import { RoleDto } from "@/common/dtos";
import { LoginForm } from "../../../../../../../common/types";
import { axiosAdminInstance } from "../../../../../../../core/data";
import { AuthStateResponse, LoginResponse } from "../../../index";




export const loginApiService = async (data: LoginForm): Promise<LoginResponse> => {

    const response  = await axiosAdminInstance.post<LoginResponse>('/api/v1/admin/auth/login', data);
        
    return response.data;    
}

export const checkAuthState = async (): Promise<AuthStateResponse> => {

    const response  = await axiosAdminInstance.get<AuthStateResponse>('/api/v1/admin/auth/check');
        
    return response.data;    
}

export const getMyRoles = async () => {

    const response  = await axiosAdminInstance.get<RoleDto>('/api/v1/admin/roles/my-roles');
        
    return response.data;
}

export const logout = async () => {
    await axiosAdminInstance.post('/api/v1/admin/auth/logout');
}
