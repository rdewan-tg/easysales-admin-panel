import { Alert, Backdrop, Box, Button, CircularProgress, Slide, Snackbar, SnackbarCloseReason } from "@mui/material";
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
} from '@syncfusion/ej2-react-grids';
import { useEffect, useState } from "react";


const SalesCustomerScreen = () => {
    const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
    const pageSettings: PageSettingsModel = { pageSize: 15 };
    
    const isLoading = useMerchandiserCustomerStore(state => state.isLoading);
    const errorMessage = useMerchandiserCustomerStore(state => state.error);
    const customers = useMerchandiserCustomerStore(state => state.customers);
    const getMerchandiserCustomers = useMerchandiserCustomerStore.use.getMerchandiserCustomers();

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
        reason?: SnackbarCloseReason,
    ) => {
        // do not close the snackbar if the reason is 'clickaway'   
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnackBar(false);
    };


    const handleGetSalesCustomers = async (dataAreaId: string) => {
        await getMerchandiserCustomers(dataAreaId);
    }

    return (
        <Box
        sx={{
            minHeight: '80vh',
            margin: '16px',
        }}>

            {isLoading ? (
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}

            <Box>

                <Button
                    variant='outlined'
                    onClick={() => handleGetSalesCustomers('MYMA')}
                >
                    Get Sales Customers
                </Button>
            </Box>

            <Box
            sx={{
                marginTop: '16px',
            }}>

                <GridComponent
                    dataSource={customers}
                    allowResizing={true}
                    autoFit={true}
                    allowPaging={true}
                    pageSettings={pageSettings}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='Id'  minWidth='50' width='70' maxWidth='100' textAlign="Left" />
                        <ColumnDirective field='customerId' headerText='CustomerId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='customerName' headerText='CustomerName' minWidth='100' width='200'textAlign="Left" />
                        <ColumnDirective field='address' headerText='Address'  format="C2" textAlign="Left" />
                        <ColumnDirective field='salesPersonId' headerText='SalesPersonId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='salesPerson' headerText='SalesPerson' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='merchandiser' headerText='Merchandiser' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='phoneNumber' headerText='phoneNumber' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='countryId' headerText='CountryId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='latitude' headerText='Latitude' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='longitude' headerText='Longitude' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='creditLimit' headerText='CreditLimit' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='currencyCode' headerText='CurrencyCode' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='paymentTerm' headerText='PaymentTerm' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='priceGroup' headerText='PriceGroup' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='customreDimension' headerText='CustomreDimension' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='status' headerText='status' minWidth='50' width='70' maxWidth='100' textAlign="Left"  />
                        <ColumnDirective field='companyId' headerText='companyId' minWidth='50' width='80' textAlign="Left"  />
                        <ColumnDirective field='createAt' headerText='createAt' textAlign="Left"  />
                        <ColumnDirective field='updatedAt' headerText='updatedAt'textAlign="Left"  />
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleErrorSnackbarClose}>
                    <Alert
                        onClose={handleErrorSnackbarClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>

            )}
            
        </Box>
    )
}

export default SalesCustomerScreen;