import { Alert, Backdrop, Box, CircularProgress, Slide, Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import { useMerchandiserReportStore } from "..";
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {
    ColumnDirective,
    ColumnsDirective,
    Resize,
    Toolbar,
    Filter,
    GridComponent,
    Inject,
    Page,
    PageSettingsModel,
    Sort,
    Group,
    GroupSettingsModel,
    SortDirection,
    ExcelExport,
    ToolbarItems,
} from '@syncfusion/ej2-react-grids';
import { useEffect, useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SendOutlined } from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { GetMerchandiserReportByDateRangeForm, getMerchandiserReportByDateRangeSchema } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { parse } from "date-fns";


const MerchandiserReportByDateRangeScreen = () => {
    const gridRef = useRef<GridComponent | null>(null);
    const pageSettings: PageSettingsModel = { pageSize: 50 };
    const toolbar: ToolbarItems[] = ['ExcelExport'];
    const groupOptions: GroupSettingsModel = {
        columns: ['salesPersonCode']
    };
    const sortingOptions = {
        columns: [
            { field: 'salesPersonCode', direction: 'Ascending' as SortDirection },
        ],
    };

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


    const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
    const isLoading = useMerchandiserReportStore((state) => state.isLoading);
    const errorMessage = useMerchandiserReportStore((state) => state.error);
    const transDates = useMerchandiserReportStore((state) => state.transDates);
    const data = useMerchandiserReportStore((state) => state.siteVisiteReportByDateRangeDetail);
    const getSiteVisiteReportByDateRange = useMerchandiserReportStore.use.getSiteVisiteReportByDateRange();
    const getTransDates = useMerchandiserReportStore.use.getTransDates();

    // fetch transDates when the component mounts
    useEffect(() => {
        async function fetchTransDates() {
            getTransDates();
        }
        fetchTransDates();
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


    const form = useForm<GetMerchandiserReportByDateRangeForm>({
        resolver: zodResolver(getMerchandiserReportByDateRangeSchema),
    });

    // destructure form
    const {
        control,
        handleSubmit,
        formState,
    } = form;

    // destructure formState
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit: SubmitHandler<GetMerchandiserReportByDateRangeForm> = async (data: GetMerchandiserReportByDateRangeForm) => {
        await getSiteVisiteReportByDateRange(data.startDate, data.endDate);
    };

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

            <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'block', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="from-date"
                            type="text"
                            size="small"
                            select
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            helperText={errors.startDate ? errors.startDate.message : null}
                            sx={{ width: 'auto', maxWidth: 300, marginRight: 2 }}
                        >
                            <option aria-label="None" value="" >Select a From Date</option>
                            {
                                transDates
                                    .slice() // Copy to avoid mutating the original state
                                    .sort((a, b) =>
                                        parse(a.transDate, "dd-MM-yyyy", new Date()).getTime() -
                                        parse(b.transDate, "dd-MM-yyyy", new Date()).getTime()
                                    )
                                    .map((option, index) => (
                                        <option key={index} value={option.transDate}>
                                            {option.transDate}
                                        </option>
                                    ))}
                        </TextField>

                    )}
                />

                <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="end-date"
                            type="text"
                            size="small"
                            select
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            helperText={errors.startDate ? errors.startDate.message : null}
                            sx={{ width: 'auto', maxWidth: 300 }}
                        >
                            <option aria-label="None" value="" >Select a To Date</option>
                            {
                                transDates
                                    .map((option, index) => (
                                        <option key={index} value={option.transDate}>
                                            {option.transDate}
                                        </option>
                                    ))}
                        </TextField>

                    )}
                />

                <LoadingButton
                    loading={isSubmitting}
                    loadingPosition="center"
                    startIcon={<SendOutlined />}
                    variant="contained"
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    sx={
                        {
                            width: '100%',
                            maxWidth: 180,
                            marginLeft: 2,
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'secondary.main',
                            }
                        }
                    }
                >
                    Go
                </LoadingButton>
            </Box>

            <Box
                sx={{
                    marginTop: '16px',
                }}>

                <GridComponent
                    id='Grid'
                    dataSource={data}
                    allowResizing={true}
                    autoFit={true}
                    allowPaging={true}
                    pageSettings={pageSettings}
                    allowSorting={true}
                    sortSettings={sortingOptions}
                    allowGrouping={true}
                    groupSettings={groupOptions}
                    toolbar={toolbar}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                    excelExportComplete={excelExportComplete}
                    ref={g => {
                        gridRef.current = g;
                    }}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='salesPersonCode' headerText='SalesPerson' width='150' textAlign="Left" />
                        <ColumnDirective field='customerId' headerText='CustomerId' width='150' textAlign="Left" />
                        <ColumnDirective field='customerName' headerText='CustomerName' width='150' textAlign="Left" />
                        <ColumnDirective field='customerAddress' headerText='Address' width='150' textAlign="Left" />
                        <ColumnDirective field='transDate' headerText='Date' width='150' textAlign="Left" />
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter, Group, Resize, Toolbar, ExcelExport]} />
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
};

export default MerchandiserReportByDateRangeScreen;