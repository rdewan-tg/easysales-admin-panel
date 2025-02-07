import { axiosAdminInstance, createActivityLogEndpoint, getActivityLogsEndpoint } from "@/core/data";
import { ActivityLog, ActivityLogDto } from "../../..";




export const getActivityLogs = async () => {
    const response = await axiosAdminInstance.get<ActivityLogDto>(getActivityLogsEndpoint);
    return response.data;
}

export const createActivityLog = async (data: ActivityLog) => {
    const response = await axiosAdminInstance.post<ActivityLogDto>(createActivityLogEndpoint, data);
    return response.data;
}