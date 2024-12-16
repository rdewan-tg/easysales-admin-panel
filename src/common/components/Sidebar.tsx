import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getIconComponent, menuConfig } from "@/core/route";
import { useState } from "react";


const Sidebar = () => {
  const navigate = useNavigate();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const handleToggle = (label: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderMenuItem = (menu: typeof menuConfig[0]) => {
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <div key={menu.label}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => (hasChildren ? handleToggle(menu.label) : navigate(menu.path))}>
            <ListItemIcon>{getIconComponent(menu.iconKey)}</ListItemIcon>
            <ListItemText primary={menu.label} />
            {hasChildren ? openSubmenus[menu.label] ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={openSubmenus[menu.label]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menu.children?.map((child) => (
                <ListItemButton
                  key={child.label}
                  sx={{ pl: 4 }}
                  onClick={() => navigate(child.path)}
                >
                  <ListItemIcon>{getIconComponent(child.iconKey)}</ListItemIcon>
                  <ListItemText primary={child.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </div>
    );
  };

  return <List>{menuConfig.map(renderMenuItem)}</List>;
};

export default Sidebar;
