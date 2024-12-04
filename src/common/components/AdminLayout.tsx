import { useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { darkTheme, lightTheme } from "../../common/theme/theme";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { useAuthStore } from "../../features/auth/login/presentation/index";
import { routeName } from "@/core/route";

const drawerWidth = 240;

export const AdminLayout = (): JSX.Element => {
  const navigate = useNavigate(); // For navigation
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore.use.logout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // State to manage theme mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Use the selected theme
  const theme = darkMode ? darkTheme : lightTheme;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate(`/${routeName.login}`);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100vh", // Full viewport height
          width: "100vw",  // Full viewport width
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Prevent scrollbars
          boxSizing: "border-box", // Ensures padding is included in height/width
        }}
      >
        {/* AppBar at the top */}
        <AppBar
          id="app-bar"
          position="fixed"
          elevation={0}
          sx={{ boxShadow: "none", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            {/* App name on the left */}
            <Typography
              variant="h5"
              component="div"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", flexGrow: 1 }}
            >
              EasySales
            </Typography>

            {/* Profile/Login Menu on the right */}
            <Box>
              <IconButton
                id="theme-toggle"
                sx={{ ml: 1 }}
                onClick={handleThemeChange}
                color="inherit"
                aria-label="toggle theme"
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Switch
                id="theme-toggle"
                checked={darkMode}
                onChange={handleThemeChange}
                color="default"
              />

              {/* only show if user is not authenticated */}
              {!isAuthenticated && (
                <Typography
                  variant="h6"
                  component="span"
                  onClick={handleLogin}
                  sx={{ cursor: "pointer" }}
                >
                  Login
                </Typography>
              )}

              {/* only show if user is authenticated */}
              {isAuthenticated && (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <Divider component="li" />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {isAuthenticated && (
          <>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  {["Users", "Roles", "Company"].map((name, index) => (
                    <ListItem key={name} disablePadding>
                      <ListItemButton
                        onClick={() =>
                          navigate(`/${routeName.dashboard}/${name.toLowerCase()}`)
                        }
                      >
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            </Drawer>
          </>
        )}

        {/* Conditionally render the welcome card only on the root ("/") route */}
        {location.pathname === "/" && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 8, // Adjust for AppBar height (e.g., 64px)
              overflow: "auto", // Scroll only if necessary

            }}
          >
            <Card sx={{ maxWidth: 400, p: 2 }}>
              <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  Welcome to EasySales
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your platform for efficient sales management and insights.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              </CardActions>
            </Card>
          </Box>
        )}

        {/* Main content - renders the child routes */}
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};