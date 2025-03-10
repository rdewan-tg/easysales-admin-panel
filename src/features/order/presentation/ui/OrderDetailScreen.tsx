import { Alert, Backdrop, Box, CircularProgress, Slide, Snackbar, SnackbarCloseReason } from "@mui/material"
import { useOrderStore } from "..";
import { useEffect, useRef, useState } from "react";
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
    Search,
} from '@syncfusion/ej2-react-grids';
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";


const OrderDetailScreen = () => {
    const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
    const toolbar: ToolbarItems[] = ['ExcelExport', 'Search'];
    const pageSettings: PageSettingsModel = { pageSize: 15 };
    const gridRef = useRef<GridComponent | null>(null);

    const isLoading = useOrderStore(state => state.isLoading);
    const errorMessage = useOrderStore(state => state.error);
    const salesHeasers = useOrderStore((state) => state.salesHeaders);
    const getSalesHeaders = useOrderStore.use.getSalesHeaders();

    useEffect(() => {
        async function fetchSalesHeaders() {
            await getSalesHeaders();
        }
        fetchSalesHeaders();
    }, []);

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

    const created = () => {
        (document.getElementById((gridRef.current as GridComponent).element.id + "_searchbar") as HTMLElement).addEventListener('keyup', (event) => {
            (gridRef.current as GridComponent).search((event.target as HTMLInputElement).value)
        });
    }

    const toolbarClick = (args: ClickEventArgs) => {
        if (gridRef.current && args.item.id === 'Grid_excelexport') {
            gridRef.current.showSpinner();
            gridRef.current.excelExport();
        }
    }

    const excelExportComplete = (): void => {
        if (gridRef.current) {
            gridRef.current.hideSpinner();
        }
    }


    return (
        <Box sx={{
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

            <Box
                sx={{
                    marginTop: '16px',
                }}>

                <GridComponent
                    id='Grid'
                    dataSource={salesHeasers}
                    allowResizing={true}
                    autoFit={true}
                    allowPaging={true}
                    pageSettings={pageSettings}
                    toolbar={toolbar}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                    excelExportComplete={excelExportComplete}
                    ref={g => {
                        gridRef.current = g;
                    }}
                    created={created}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='Id' minWidth='50' width='70' maxWidth='100' textAlign="Left" />
                        <ColumnDirective field='salesId' headerText='SalesId' width='200' textAlign="Left" />
                        <ColumnDirective field='customerId' headerText='CustomerId' width='150' textAlign="Left" />
                        <ColumnDirective field='customerName' headerText='CustomerName' width='150' textAlign="Left" />
                        <ColumnDirective field='customerAddress' headerText='CustomerAddress' width='150' textAlign="Left" />
                        <ColumnDirective field='salesPersonId' headerText='SalesPersonId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='customerRequisition' headerText='CustomerRequisition' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='customerPriceGroup' headerText='CustomerPriceGroup' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='note' headerText='Note' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='deliveryAddressLocation' headerText='DeliveryAddressLocation' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='deliveryDate' headerText='DeliveryDate' minWidth='50' width='70' maxWidth='100' textAlign="Left" />
                        <ColumnDirective field='transactionDate' headerText='TransactionDate' minWidth='50' width='80' textAlign="Left" />
                        <ColumnDirective field='deviceId' headerText='DeviceId' textAlign="Left" />
                        <ColumnDirective field='syncStatus' headerText='syncStatus' textAlign="Left" />
                        <ColumnDirective field='createAt' headerText='createAt' textAlign="Left" />
                        <ColumnDirective field='updatedAt' headerText='updatedAt' textAlign="Left" />
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, ExcelExport, Search]} />
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
    );
}

export default OrderDetailScreen;