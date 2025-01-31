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
    DevicesOutlined,
    ContactMailOutlined
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
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
    devicesOutlined: DevicesOutlined,
    contactMailOutlined: ContactMailOutlined,
};

/*
    This interface defines the shape of an object that represents a menu item configuration. It has the following properties:
    label: a string that represents the label of the menu item
    path: a string that represents the URL path of the menu item
    iconKey: a key that references an icon from the iconMapping object
    children: an optional array of MenuItemConfig objects that represent submenu items
*/
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
            { label: "Address", path: "/dashboard/address", iconKey: "contactMailOutlined" },
            { label: "Item", path: "/dashboard/item/item-list", iconKey: "categoryOutlinedIcon" },
            { label: "Price", path: "/dashboard/price/price-list", iconKey: "priceChangeOutlinedIcon" },

        ],
    },
    { label: "Device Setting", path: "/dashboard/device-setting", iconKey: "devicesOutlined" },
    { label: "Logs", path: "/dashboard/activity-log", iconKey: "receiptLongOutlinedIcon" },
];

// Export the icon resolver
/*
    This function, getIconComponent, returns a React icon component based on the provided iconKey and isActive status.
    It uses the iconMapping object to resolve the icon component and applies theme-based styling (active or inactive color) to the icon. 
    If the iconKey is not found in iconMapping, it returns null.
*/
export const getIconComponent = (iconKey: keyof typeof iconMapping, isActive: boolean) => {
    const theme = useTheme(); // Get theme colors

    const IconComponent = iconMapping[iconKey];
    return IconComponent ? React.createElement(IconComponent, {
        style: {
            color: isActive
                ? theme.palette.primary.main // Active color
                : theme.palette.text.secondary, // Inactive color

        }
    }) : null;
};