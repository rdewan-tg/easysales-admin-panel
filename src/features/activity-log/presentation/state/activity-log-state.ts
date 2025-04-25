import { ActivityLog } from "../../data";

export type ActivityLogState = {
  logs: ActivityLog[];
  isLoading: boolean;
  error: string | null;
  getActivityLogs: () => Promise<void>;
  createActivityLog: (activityLog: ActivityLog) => Promise<void>;
};
