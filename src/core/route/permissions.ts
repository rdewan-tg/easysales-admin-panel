import { Role } from "@/common/interface";


export const permissions: Record<Role["name"], string[]> = {
    admin: [
        "dashboard",
        "users",
        "roles",
        "companies",
        "countries",
        "sales-order",
        "activity-log",
        'device-setting',
        'photo',
        'merchandiser-report-by-date-range',
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
        "sales-order",
        "activity-log",
        'device-setting',
        'photo',
        'merchandiser-report-by-date-range',
        "master-data",
        "address",
        "item",
        "price",
    ],
    manager: ["dashboard", "photo","merchandiser-report-by-date-range", "master-data", "address", "item", "price"],
    supervisor: ["dashboard", 'photo', "master-data", "address", "item", "price"],
};
