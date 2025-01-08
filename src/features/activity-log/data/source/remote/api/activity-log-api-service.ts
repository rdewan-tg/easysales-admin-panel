import { axiosAdminInstance } from "@/core/data";
import { ActivityLog, ActivityLogDto } from "../../..";




export const getActivityLogs = async () => {
    const response = await axiosAdminInstance.get<ActivityLogDto>('/api/v1/activity-logs');
    return response.data;
}

export const createActivityLog = async (data: ActivityLog) => {
    const response = await axiosAdminInstance.post<ActivityLogDto>('/api/v1/activity-logs', data);
    return response.data;
}