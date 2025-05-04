import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useMerchandiserCustomerStore } from "..";
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
  ToolbarItems,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetCustomerForm, getCustomerSchema } from "@/common/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { SendOutlined, CloudDownload } from "@mui/icons-material";
import { useCompanyStore } from "@/features/company/presentation";
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";

const MerchandiserCustomerScreen = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
  const pageSettings: PageSettingsModel = { pageSize: 15 };
  const toolbar: ToolbarItems[] = ["ExcelExport"];

  const isLoading = useMerchandiserCustomerStore((state) => state.isLoading);
  const errorMessage = useMerchandiserCustomerStore((state) => state.error);
  const customers = useMerchandiserCustomerStore((state) => state.customers);
  const getMerchandiserCustomers =
    useMerchandiserCustomerStore.use.getMerchandiserCustomers();
  const importFromAzureDb = useMerchandiserCustomerStore.use.importFromAzureDb();

  const companies = useCompanyStore((state) => state.companies);
  const getCompanies = useCompanyStore.use.getCompanies();

  const toolbarClick = (args: ClickEventArgs) => {
    if (gridRef.current && args.item.id === "Grid_excelexport") {
      gridRef.current.showSpinner();
      gridRef.current.excelExport();
    }
  };

  const excelExportComplete = (): void => {
    if (gridRef.current) {
      gridRef.current.hideSpinner();
    }
  };

  const form = useForm<GetCustomerForm>({
    resolver: zodResolver(getCustomerSchema),
  });

  // destructure form
  const { handleSubmit, formState, control } = form;
  // destructure formState
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<GetCustomerForm> = async (
    data: GetCustomerForm,
  ) => {
    await getMerchandiserCustomers(data.companyCode);
  };

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  useEffect(() => {
    async function fetchCompanies() {
      await getCompanies();
    }

    fetchCompanies();
  }, []);

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
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "block",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Controller
          name="companyCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="company-code"
              select
              label="Company Code"
              defaultValue=""
              variant="outlined"
              size="small"
              error={!!errors.companyCode}
              helperText={errors.companyCode?.message}
              sx={{ minWidth: 200, marginRight: 2 }}
            >
              {companies.map((company) => (
                <MenuItem
                  key={company.companyCode}
                  value={company.companyCode}
                >
                  {company.companyCode} - {company.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<SendOutlined />}
          disabled={!isValid}
          sx={{ marginRight: 2 }}
        >
          Submit
        </LoadingButton>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          onClick={() => importFromAzureDb()}
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          Refresh from Azure
        </Button>
      </Box>

      <Box
        sx={{
          marginTop: "16px",
        }}
      >
        <GridComponent
          id="Grid"
          dataSource={customers}
          allowResizing={true}
          autoFit={true}
          allowPaging={true}
          pageSettings={pageSettings}
          toolbar={toolbar}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          excelExportComplete={excelExportComplete}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
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
              field="customerId"
              headerText="CustomerId"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="customerName"
              headerText="CustomerName"
              minWidth="100"
              width="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="address"
              headerText="Address"
              format="C2"
              textAlign="Left"
            />
            <ColumnDirective
              field="salesPersonId"
              headerText="SalesPersonId"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="salesPerson"
              headerText="SalesPerson"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="merchandiser"
              headerText="Merchandiser"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="phoneNumber"
              headerText="phoneNumber"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="countryId"
              headerText="CountryId"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="latitude"
              headerText="Latitude"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="longitude"
              headerText="Longitude"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="creditLimit"
              headerText="CreditLimit"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="currencyCode"
              headerText="CurrencyCode"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="paymentTerm"
              headerText="PaymentTerm"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="priceGroup"
              headerText="PriceGroup"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="customreDimension"
              headerText="CustomreDimension"
              minWidth="100"
              width="150"
              maxWidth="200"
              textAlign="Left"
            />
            <ColumnDirective
              field="status"
              headerText="status"
              minWidth="50"
              width="70"
              maxWidth="100"
              textAlign="Left"
            />
            <ColumnDirective
              field="companyId"
              headerText="companyId"
              minWidth="50"
              width="80"
              textAlign="Left"
            />
            <ColumnDirective
              field="createAt"
              headerText="createAt"
              textAlign="Left"
            />
            <ColumnDirective
              field="updatedAt"
              headerText="updatedAt"
              textAlign="Left"
            />
          </ColumnsDirective>
          <Inject
            services={[Page, Sort, Filter, Group, Resize, Toolbar, ExcelExport]}
          />
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

export default MerchandiserCustomerScreen;
