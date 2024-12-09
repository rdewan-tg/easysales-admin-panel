import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  List,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import useUserStore from "../store/user-store";
import { PersonAdd, RefreshOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BaseSnackBarComponent } from "../../../../common/components";
import { routeName } from "@/core/route";

const UsersListPage = () => {
  const navigate = useNavigate();

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const deleteSnackbarOpen = useUserStore(
    (state) => state.deleteSnackbarOpen
  );
  const setDeleteMemberSnackbarOpen =
    useUserStore.use.setDeleteUserSnackbarOpen();

  const isLoading = useUserStore((state) => state.isLoading);
  const isUserDeleted = useUserStore((state) => state.isUserDeleted);
  const users = useUserStore((state) => state.users);
  const errorMessage = useUserStore((state) => state.error);

  const getUsersByCompany = useUserStore.use.getUsersByCompany();

  useEffect(() => {
    // check if member is deleted
    if (isUserDeleted) {
      setDeleteMemberSnackbarOpen(true);
    }
    // fetch members when the component mounts
    const fetchMembers = async () => {
      if (!isLoading && users.length === 0) {
        // Check if it's already loading or data exists
        await getUsersByCompany();
      }
    };
    fetchMembers();
  }, [getUsersByCompany, isLoading, isUserDeleted]);

  const handleErrorSnackbarOpen = () => {
    setOpenErrorSnackbar(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
    setDeleteMemberSnackbarOpen(false);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarOpen();
    }
  }, [errorMessage]);

  const navigateToMemberDetails = (id: number) => {
    // navigate to the member details page
    navigate(`/${routeName.dashboard}/${routeName.users}/${id}`);
  };

  const navigateToCreateUser = () => {
    navigate(`/${routeName.dashboard}/${routeName.users}/${routeName.createUser}`);
  }

  return (
    <Box component={"main"} sx={{
      flexGrow: 1,          // Ensures it takes the available space
      overflow: "auto",     // Ensures content scrolling without affecting layout
      m: 0,                 // Remove margin to avoid layout overflow
      p: 1,                 // Optional padding for spacing within the container
      height: "100%",       // Ensures the container fits the parent
      boxSizing: "border-box", // Include padding in height/width calculations
    }}>
      <Typography variant="h3">Users</Typography>

      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <IconButton color="primary" onClick={getUsersByCompany}>
        <RefreshOutlined />
      </IconButton>

      <IconButton color="primary" onClick={navigateToCreateUser}>
        <PersonAdd />
      </IconButton>

      <Grid>
        <List dense={true}>
          {Array.isArray(users) ? (
            users.map((member) => (
              <Card
                key={member.id}
                raised
                onClick={() => navigateToMemberDetails(member.id)}
                sx={{ mb: 2, p: 2 }}
              >
                <CardHeader
                  avatar={<Avatar alt={member.name} src={member.photo ?? undefined} />}
                  title={member.name}
                  subheader={member.email}
                />
              </Card>
            ))
          ) : (
            <Typography variant="body1">No users available</Typography>
          )}
        </List>
      </Grid>

      {/* Display global error */}
      {errorMessage && (
        <BaseSnackBarComponent
          message={errorMessage}
          autoHideDuration={6000}
          severity="error"
          open={openErrorSnackbar}
          onClose={handleSnackbarClose}
        />
      )}

      {/* Display member deleted message */}
      {isUserDeleted && (
        <BaseSnackBarComponent
          message="User deleted successfully"
          severity="success"
          open={deleteSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      )}
    </Box>
  );
};

export default UsersListPage;
