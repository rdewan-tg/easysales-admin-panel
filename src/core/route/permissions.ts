import { Role } from "@/features/role/data";

export const permissions: Record<Role["name"], string[]> = {
    admin: [
        "dashboard",
        "users",
        "roles",
        "companies",
        "countries",
        "activity-log",
        'device-setting',
        'photo',
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
        "activity-log",
        'device-setting',
        'photo',
        "master-data",
        "address",
        "item",
        "price",
    ],
    manager: ["dashboard", 'photo', "master-data", "address", "item", "price"],
    supervisor: ["dashboard", 'photo', "master-data", "address", "item", "price"],
};
