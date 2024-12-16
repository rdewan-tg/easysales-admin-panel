import {
    PeopleAltOutlined,
    ShieldOutlined,
    BusinessOutlined,
    PublicOutlined,
    PhotoAlbumOutlined,
    PhotoLibraryOutlined,
    ViewListOutlined,
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
            { label: "List", path: "/dashboard/photo", iconKey: "list" },
        ],
    },
];

// Export the icon resolver
export const getIconComponent = (iconKey: keyof typeof iconMapping) => {
    const IconComponent = iconMapping[iconKey];
    return IconComponent ? React.createElement(IconComponent) : null;
};