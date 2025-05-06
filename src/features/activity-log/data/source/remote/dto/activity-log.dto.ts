export interface ActivityLogDto {
  status: string;
  data: ActivityLog[];
  meta?: PaginationMetadata;
}

export interface ActivityLog {
  id?: number;
  userId?: string;
  action: string;
  details: string;
  level: string;
  timestamp?: Date;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
