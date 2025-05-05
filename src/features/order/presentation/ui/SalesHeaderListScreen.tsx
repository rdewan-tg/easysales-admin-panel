import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useOrderStore } from "..";
import { useEffect, useRef, useState } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  ExcelExport,
  GridComponent,
  Inject,
  Page,
  PageSettingsModel,
  Resize,
  Search,
  SearchSettingsModel,
  Sort,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";

const SalesHeaderListScreen = () => {
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);

  const toolbar: ToolbarItems[] = ["Search"];
  const pageSettings: PageSettingsModel = { pageSize: 50 };
  const searchSettings: SearchSettingsModel = { ignoreCase: true };
  const gridRef = useRef<GridComponent | null>(null);

  const isLoading = useOrderStore((state) => state.isLoading);
  const errorMessage = useOrderStore((state) => state.error);
  const salesHeaders = useOrderStore((state) => state.salesHeaders);
  const getSalesHeadersByCompany = useOrderStore.use.getSalesHeadersByCompany();

  useEffect(() => {
    const fetchSalesHeaders = async () => {
      await getSalesHeadersByCompany();
    };
    fetchSalesHeaders();
  }, []);

  // Add event listener for automatic search on each keystroke
  const gridCreated = () => {
    if (gridRef.current) {
      // Get the search bar element after a short delay to ensure it's rendered
      setTimeout(() => {
        const searchElement = document.getElementById(
          `${gridRef.current?.element.id}_searchbar`
        ) as HTMLInputElement;
        
        if (searchElement) {
          // Add input event listener to trigger search on each keystroke
          searchElement.addEventListener("input", (event) => {
            if (gridRef.current) {
              const searchValue = (event.target as HTMLInputElement).value;
              gridRef.current.search(searchValue);
            }
          });
        }
      }, 100);
    }
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  const handleErrorSnackbarClick = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
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

      <GridComponent
        id="salesHeaderGrid"
        dataSource={salesHeaders}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={false}
        allowExcelExport={true}
        toolbar={toolbar}
        pageSettings={pageSettings}
        searchSettings={searchSettings}
        ref={gridRef}
        created={gridCreated}
      >
        <ColumnsDirective>
          <ColumnDirective field="salesId" headerText="Sales ID" width="120" />
          <ColumnDirective field="customerName" headerText="Customer Name" width="150" />
          <ColumnDirective field="customerAddress" headerText="Address" width="200" />
          <ColumnDirective field="salesPersonId" headerText="Sales Person" width="120" />
          <ColumnDirective field="customerRequisition" headerText="Requisition" width="120" />
          <ColumnDirective field="deliveryDate" headerText="Delivery Date" width="120" format="yMd" />
          <ColumnDirective field="transactionDate" headerText="Transaction Date" width="120" format="yMd" />
          <ColumnDirective field="note" headerText="Note" width="150" />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Search, Resize, ExcelExport]} />
      </GridComponent>

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

export default SalesHeaderListScreen;
