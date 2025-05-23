import { Role } from "@/common/interface";

export const permissions: Record<Role["name"], string[]> = {
  admin: [
    "dashboard",
    "users",
    "roles",
    "companies",
    "countries",
    "order-detail",
    "sales-order",
    "sales-header",
    "sales-line",
    "activity-log",
    "device-setting",
    "photo",
    "merchandiser-report-by-date-range",
    "master-data",
    "address",
    "item",
    "price",
  ],
  superAdmin: [
    "dashboard",
    "users",
    "roles",
    "companies",
    "countries",
    "order-detail",
    "sales-header",
    "sales-line",
    "activity-log",
    "device-setting",
    "photo",
    "merchandiser-report-by-date-range",
    "master-data",
    "address",
    "item",
    "price",
  ],
  manager: [
    "dashboard",
    "order-detail",
    "sales-header",
    "sales-line",
    "photo",
    "merchandiser-report-by-date-range",
    "master-data",
    "address",
    "item",
    "price",
  ],
  supervisor: [
    "dashboard",
    "photo",
    "order-detail",
    "sales-header",
    "sales-line",
    "master-data",
    "address",
    "item",
    "price",
  ],
};
