import { Alert, Backdrop, Box, Chip, CircularProgress, Paper, Slide, Snackbar, SnackbarCloseReason, Stack, Typography } from "@mui/material"
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
    FilterSettingsModel,
    DetailRow,
    SelectionSettingsModel,
    RowSelectEventArgs,
} from '@syncfusion/ej2-react-grids';
import { ClickEventArgs } from "@syncfusion/ej2-react-navigations";
import { SalesHeaderData } from "../../data/source";


const OrderDetailScreen = () => {
    const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
    const toolbar: ToolbarItems[] = ['Search'];
    const filterSettings: FilterSettingsModel = { type: 'Excel' };
    const pageSettings: PageSettingsModel = { pageSize: 15 };
    const gridRef = useRef<GridComponent | null>(null);
    const selectionSettings: SelectionSettingsModel = { mode: 'Row', type: 'Multiple' };

    const isLoading = useOrderStore(state => state.isLoading);
    const errorMessage = useOrderStore(state => state.error);
    const salesHeasers = useOrderStore((state) => state.salesHeaders);
    const salesLines = useOrderStore((state) => state.salesLines);
    const getSalesLinesById = useOrderStore.use.getSalesLinesById();
    const getSalesHeaders = useOrderStore.use.getSalesHeaders();
    const setSelectedSalesIds = useOrderStore.use.setSelectedSalesIds();
    const selectedSalesIds = useOrderStore((state) => state.selectedSalesIds);

    const childGrid: any = {
        dataSource: salesLines,
        queryString: 'salesId',
        columns: [
            { field: 'salesId', headerText: 'Sales ID', textAlign: 'Right', width: 120 },
            { field: 'lineId', headerText: 'LineId', width: 120 },
            { field: 'itemId', headerText: 'ItemId', width: 120 },
            { field: 'productId', headerText: 'ProductId', width: 150 },
            { field: 'productName', headerText: 'ProductName', width: 150 },
            { field: 'packSize', headerText: 'PackSize', width: 150 },
            { field: 'quantity', headerText: 'Quantity', width: 150 },
            { field: 'salesUnit', headerText: 'SalesUnit', width: 150 },
            { field: 'salesPrice', headerText: 'SalesPrice', width: 150 },
        ],
    };

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
        if (gridRef.current) {
            gridRef.current.selectionSettings.enableSimpleMultiRowSelection = true;
        }

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

    // Fetch child data without collapsing
    const detailDataBound = async (args: any) => {
        if (args.data && args.data.salesId) {
            await getSalesLinesById(args.data.salesId);
        }
    };

    const rowSelected = (args: RowSelectEventArgs) => {
        if (!args.data) return;   
 
    
        if (!Array.isArray(args.data)) {
            const data = args.data as SalesHeaderData;
            setSelectedSalesIds(data.salesId);
        } else {
            const selectedSales = args.data as SalesHeaderData[];
            const newSelection = new Set(selectedSalesIds); // Start with current state
    
            // Toggle each item in the selection
            selectedSales.forEach(item => {
                if (newSelection.has(item.salesId)) {
                    newSelection.delete(item.salesId); // Unselect
                } else {
                    newSelection.add(item.salesId); // Select
                }
            });
    
            // Update Zustand
           setSelectedSalesIds(Array.from(newSelection));
        }
    };

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

                {selectedSalesIds.length > 0 && (
                    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Selected Sales IDs ({selectedSalesIds.length}):
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {selectedSalesIds.map((id) => (
                                <Chip key={id} label={id} />
                            ))}
                        </Stack>
                    </Paper>
                )}


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
                    childGrid={childGrid}
                    filterSettings={filterSettings}
                    ref={g => {
                        gridRef.current = g;
                    }}
                    created={created}
                    detailDataBound={detailDataBound}
                    selectionSettings={selectionSettings}
                    rowSelected={rowSelected}
                >
                    <ColumnsDirective>
                        <ColumnDirective type='checkbox' width='50'></ColumnDirective>
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
                    <Inject services={[DetailRow, Page, Sort, Filter, Group, Resize, Toolbar, ExcelExport, Search]} />
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