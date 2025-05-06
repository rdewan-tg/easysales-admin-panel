import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useActivityLogStore } from "..";
import {
  ColumnDirective,
  ColumnsDirective,
  Resize,
  Toolbar,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useState } from "react";

//import { DevTool } from "@hookform/devtools";

const ActivityLogScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  
  const isLoading = useActivityLogStore((state) => state.isLoading);
  const errorMessage = useActivityLogStore((state) => state.error);
  const logs = useActivityLogStore((state) => state.logs);
  const currentPage = useActivityLogStore((state) => state.currentPage);
  const pageSize = useActivityLogStore((state) => state.pageSize);
  const totalRecords = useActivityLogStore((state) => state.totalRecords);
  const getActivityLogs = useActivityLogStore.use.getActivityLogs();

  // Create pageSettings with the current state values
  const pageSettings: PageSettingsModel = { 
    pageSize: pageSize,
    pageCount: Math.ceil(totalRecords / pageSize),
    currentPage: currentPage
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  useEffect(() => {
    async function fetchActivityLogs() {
      await getActivityLogs(currentPage, pageSize);
    }

    fetchActivityLogs();
  }, []);

  // Handle page change events
  const onPageChange = (event: any) => {
    const newPage = event.currentPage || 1;
    if (newPage !== currentPage) {
      getActivityLogs(newPage, pageSize);
    }
  };

  const handleErrorSnackbarClick = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        margin: "16px",
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
          marginTop: "16px",
        }}
      >
        <GridComponent
          dataSource={logs}
          allowResizing={true}
          autoFit={true}
          allowPaging={true}
          pageSettings={pageSettings}
          allowSorting={true}
          dataBound={(args) => {
            // This event fires after data is bound to the grid
            // We can use it to set up event listeners
            const grid = args.target;
            if (grid) {
              grid.on('actionComplete', (e: any) => {
                // Check if this is a paging action
                if (e.requestType === 'paging') {
                  onPageChange(e);
                }
              });
            }
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="Id"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="userId"
              headerText="UserId"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="action"
              headerText="Action"
              minWidth="100"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="level"
              headerText="Level"
              minWidth={"100"}
              maxWidth={"100"}
              textAlign="Left"
            />
            <ColumnDirective
              field="timestamp"
              headerText="Timestamp"
              minWidth="150"
              width="150"
              maxWidth="250"
              textAlign="Left"
            />
            <ColumnDirective
              field="details"
              headerText="Details"
              minWidth="150"
              textAlign="Left"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar]} />
        </GridComponent>
      </Box>

      {/* Display global error */}
      {errorMessage && (
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleErrorSnackbarClose}
        >
          <Alert
            onClose={handleErrorSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ActivityLogScreen;
