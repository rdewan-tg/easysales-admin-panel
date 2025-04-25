export interface ActivityLogDto {
  status: string;
  data: ActivityLog[];
}

export interface ActivityLog {
  id?: number;
  userId?: string;
  action: string;
  details: string;
  level: string;
  timestamp?: Date;
}
