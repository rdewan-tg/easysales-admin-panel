import {
    PeopleAltOutlined,
    ShieldOutlined,
    BusinessOutlined,
    PublicOutlined,
    PhotoAlbumOutlined,
    PhotoLibraryOutlined,
    ViewListOutlined,
    GridView,
    HailOutlined,
    CategoryOutlined,
    PriceChangeOutlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";
import React from "react";

// Define an icon mapping function
const iconMapping = {
    users: PeopleAltOutlined,
    roles: ShieldOutlined,
    companies: BusinessOutlined,
    countries: PublicOutlined,
    photo: PhotoAlbumOutlined,
    gallery: PhotoLibraryOutlined,
    list: ViewListOutlined,
    grid: GridView,
    hailOutlined: HailOutlined,
    categoryOutlinedIcon: CategoryOutlined,
    priceChangeOutlinedIcon: PriceChangeOutlined,
    receiptLongOutlinedIcon: ReceiptLongOutlined,
};

export interface MenuItemConfig {
    label: string;
    path: string;
    iconKey: keyof typeof iconMapping; // Reference the keys from iconMapping
    children?: MenuItemConfig[]; // Submenu items
}

export const menuConfig: MenuItemConfig[] = [
    { label: "Users", path: "/dashboard/users", iconKey: "users" },
    { label: "Roles", path: "/dashboard/roles", iconKey: "roles" },
    { label: "Companies", path: "/dashboard/companies", iconKey: "companies" },
    { label: "Countries", path: "/dashboard/countries", iconKey: "countries" },
    {
        label: "Photo",
        path: "/dashboard/photo",
        iconKey: "photo",
        children: [
            { label: "Gallery", path: "/dashboard/photo/photo-gallery", iconKey: "gallery" },
            { label: "Data Grid", path: "/dashboard/photo", iconKey: "grid" },
        ],
    },
    {
        label: "Master Data",
        path: "/dashboard/customer",
        iconKey: "list",
        children: [
            { label: "Merchandiser Customer", path: "/dashboard/customer/merchandiser-customer", iconKey: "hailOutlined" },
            { label: "Sales Customer", path: "/dashboard/customer/sales-customer", iconKey: "hailOutlined" },
            { label: "Item", path: "/dashboard/item/item-list", iconKey: "categoryOutlinedIcon" },
            { label: "Price", path: "/dashboard/price/price-list", iconKey: "priceChangeOutlinedIcon" },
         
        ],
    },
    { label: "Logs", path: "/dashboard/activity-log", iconKey: "receiptLongOutlinedIcon" },
];

// Export the icon resolver
export const getIconComponent = (iconKey: keyof typeof iconMapping) => {
    const IconComponent = iconMapping[iconKey];
    return IconComponent ? React.createElement(IconComponent) : null;
};