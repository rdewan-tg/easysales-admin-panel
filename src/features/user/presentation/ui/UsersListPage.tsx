import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  SnackbarCloseReason,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/user-store";
import { PersonAdd, RefreshOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BaseSnackBarComponent } from "../../../../common/components";
import { routeName } from "@/core/route";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  PageSettingsModel,
  Resize,
  RowSelectEventArgs,
  SelectionSettingsModel,
  Sort,
  SortSettingsModel,
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";

const UsersListPage = () => {
  const navigate = useNavigate();
  const gridRef = useRef<GridComponent | null>(null);
  const selectionSettings: SelectionSettingsModel = {
    mode: "Row",
    type: "Single",
  };
  const toolbarOptions: ToolbarItems[] = ["Search"];
  const pageSettings: PageSettingsModel = { pageSize: 20 };
  const sortSettings: SortSettingsModel = {
    columns: [{ field: "name", direction: "Ascending" }],
  };

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const deleteSnackbarOpen = useUserStore((state) => state.deleteSnackbarOpen);
  const setDeleteMemberSnackbarOpen =
    useUserStore.use.setDeleteUserSnackbarOpen();

  const isLoading = useUserStore((state) => state.isLoading);
  const isUserDeleted = useUserStore((state) => state.isUserDeleted);
  const users = useUserStore((state) => state.users);
  const errorMessage = useUserStore((state) => state.error);

  const getUsersByCompany = useUserStore.use.getUsersByCompany();

  const created = () => {
    (
      document.getElementById(
        (gridRef.current as GridComponent).element.id + "_searchbar",
      ) as HTMLElement
    ).addEventListener("keyup", (event) => {
      (gridRef.current as GridComponent).search(
        (event.target as HTMLInputElement).value,
      );
    });
  };

  useEffect(() => {
    // fetch members when the component mounts
    const fetchMembers = async () => {
      if (!isLoading && users.length === 0) {
        // Check if it's already loading or data exists
        await getUsersByCompany();
      }
    };
    fetchMembers();
  });

  useEffect(() => {
    // check if member is deleted
    if (isUserDeleted) {
      setDeleteMemberSnackbarOpen(true);
    }
  }, [isUserDeleted]);

  const handleErrorSnackbarOpen = () => {
    setOpenErrorSnackbar(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
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

  const rowSelected = (args: RowSelectEventArgs) => {
    console.log(args.data);
    if (!args.data) {
      return;
    }
    navigateToUserDetails((args.data as any)["id"]);
  };

  const navigateToUserDetails = (id: number) => {
    // navigate to the member details page
    navigate(`/${routeName.dashboard}/${routeName.users}/${id}`);
  };

  const navigateToCreateUser = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.users}/${routeName.createUser}`,
    );
  };

  return (
    <Box
      component={"main"}
      sx={{
        position: "fixed",
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box", // Ensures padding is included in height/width
        m: 0,
        p: 0,
      }}
    >
      
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: { xs: "8px", sm: "12px", md: "16px" },
          flexWrap: "wrap",
          gap: 1,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden"
        }}
      >
        <IconButton color="primary" onClick={getUsersByCompany}>
          <RefreshOutlined />
        </IconButton>

        <IconButton color="primary" onClick={navigateToCreateUser}>
          <PersonAdd />
        </IconButton>
      </Box>

      <Box
        sx={{
          height: "80vh", // Fixed height for the grid container
          overflow: "auto", // or "scroll"
          p: 2,
        }}
      >
        <GridComponent
          dataSource={users}
          toolbar={toolbarOptions}
          allowPaging={true}
          allowResizing={true}
          selectionSettings={selectionSettings}
          pageSettings={pageSettings}
          allowSorting={true}
          sortSettings={sortSettings}
          rowSelected={rowSelected}
          created={created}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field="id" headerText="Id" width={80} />
            <ColumnDirective field="name" headerText="Name" />
            <ColumnDirective field="email" headerText="Email" />
            <ColumnDirective
              field="companyId"
              headerText="CompanyCode"
              width={100}
            />
            <ColumnDirective field="createAt" headerText="CreatedAt" />
            <ColumnDirective field="updatedAt" headerText="UpdatedAt" />
          </ColumnsDirective>
          <Inject
            services={[
              Page,
              Sort,
              Toolbar,
              Resize
            ]}
          />
        </GridComponent>
      </Box>

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
