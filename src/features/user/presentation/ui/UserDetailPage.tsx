import {
  Avatar,
  Card,
  Typography,
  Box,
  SnackbarCloseReason,
  List,
  Backdrop,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import {
  DeleteMemberComponent,
  SetRoleComponent,
  UpdatePasswordComponent,
  useUserStore,
} from "..";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useRoleStore } from "../../../role/presentation";

import {
  BaseConfirmDialog,
  BaseSnackBarComponent,
} from "../../../../common/components";



export const UserDetailPage = () => {
  const { id } = useParams();

  const [openErrorSnackbar, setErrorSnackbarOpen] = useState(false);

  const [roleId, setRoleId] = useState<number | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const isRoleAdded = useRoleStore((state) => state.isRoleAdded);
  const isRoleDeleted = useRoleStore((state) => state.isRoleDeleted);

  const isLoading = useUserStore((state) => state.isLoading);
  const errorMessage = useUserStore((state) => state.error);
  const user = useUserStore((state) => state.user);

  const getUserById = useUserStore.use.getUserById();
  const deleteUserRole = useRoleStore.use.deleteUserRole();

  useEffect(() => {
    const fetchMember = async () => {
      if (!isLoading) {
        // Check if it's already loading
        await getUserById(Number(id));
      }
    };
    fetchMember();
  }, [id, isRoleAdded, isRoleDeleted]);

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleSnackbarClick();
    }
  }, [errorMessage]);

  const handleSnackbarClick = () => {
    setErrorSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setErrorSnackbarOpen(false);
  };

  const handleRoleOpenDialog = (id: number) => {
    setIsRoleDialogOpen(true);
    setRoleId(id);
  };

  const handleRoleCloseDialog = () => {
    setIsRoleDialogOpen(false);
    setRoleId(null);
  };

  const handleDeleteUserRole = async () => {
    await deleteUserRole({ userId: Number(id), roleId: roleId ?? 0 });
    setIsRoleDialogOpen(false);
  };


  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h3">User Detail</Typography>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : null}

      <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <List>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={user?.name}
              src={user?.photo || ""}
            >
              {user?.name.charAt(0)}
            </Avatar>
          </List>

          <List>
            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user?.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Phone: {user?.phoneNumber || "N/A"}
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              <Typography variant="body1" color="text.secondary">
                Roles:
              </Typography>
              {user?.role.map((r) => (
                <Chip
                  key={r.id}
                  label={r.name}
                  color="success"
                  size="small"
                  deleteIcon={<DeleteIcon />}
                  onDelete={() => handleRoleOpenDialog(r.id)}
                  sx={{ p: 1, m: 0.2 }}
                />
              ))}
            </Box>
          </List>
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Display member roles */}
        <SetRoleComponent />

        <Divider sx={{ mt: 2, mb: 2 }} />

        <UpdatePasswordComponent userId={Number(id)} />

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Display member delete button */}
        < Typography variant="h5" gutterBottom>
          Delete User
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This action will permanently delete the user and all their data.
        </Typography>
        <DeleteMemberComponent id={Number(id)} />
      </Card>

      {/* Dialog component */}
      <BaseConfirmDialog
        title="Delete Role"
        description="Are you sure you want to delete this role from user?"
        open={isRoleDialogOpen}
        onCancel={handleRoleCloseDialog}
        onConfirm={handleDeleteUserRole}
      />


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
    </Box>
  );
};

export default UserDetailPage;
