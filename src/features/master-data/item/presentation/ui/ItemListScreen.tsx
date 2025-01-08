import { Alert, Backdrop, Box, CircularProgress, Slide, Snackbar, SnackbarCloseReason, TextField } from "@mui/material";
import { useItemStore } from "..";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetCustomerForm, getCustomerSchema } from "@/common/types";
import LoadingButton from '@mui/lab/LoadingButton';
import { SendOutlined } from "@mui/icons-material";
import { useCompanyStore } from "@/features/company/presentation";
//import { DevTool } from "@hookform/devtools";


const ItemListScreen = () => {
    const [openErrorSnackbar, setOpenErrorSnackBar] = useState(false);
    const pageSettings: PageSettingsModel = { pageSize: 15 };

    const isLoading = useItemStore(state => state.isLoading);
    const errorMessage = useItemStore(state => state.error);
    const items = useItemStore(state => state.items);
    const getItems = useItemStore.use.getItems();

    const companies = useCompanyStore((state) => state.companies);
    const getCompanies = useCompanyStore.use.getCompanies();

    const form = useForm<GetCustomerForm>({
        resolver: zodResolver(getCustomerSchema),
    });

    // destructure form
    const { handleSubmit, formState, control } = form;
    // destructure formState
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit: SubmitHandler<GetCustomerForm> = async (data: GetCustomerForm) => {
        await getItems(data.companyCode);
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
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorSnackBar(false);
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
                    name="companyCode"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="company-code"
                            type="text"
                            size="small"
                            select
                            defaultValue=""
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            helperText={errors.companyCode ? errors.companyCode.message : null}
                            sx={{ width: '100%', maxWidth: 300 }}
                        >
                            <option aria-label="None" value="" >Select a company</option>
                            {companies.map((option) => (
                                <option key={option.id} value={option.companyCode}>
                                    {option.companyCode}
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
                    Get Items
                </LoadingButton>
            </Box>

            <Box
                sx={{
                    marginTop: '16px',
                }}>

                <GridComponent
                    dataSource={items}
                    allowResizing={true}
                    autoFit={true}
                    allowPaging={true}
                    pageSettings={pageSettings}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='Id' minWidth='50' width='70' maxWidth='100' textAlign="Left" />
                        <ColumnDirective field='productId' headerText='ProductId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='itemId' headerText='ItemId' minWidth='100' width='200' textAlign="Left" />
                        <ColumnDirective field='productName' headerText='ProductName' format="C2" textAlign="Left" />
                        <ColumnDirective field='description' headerText='Description' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='category' headerText='Category' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='barcode' headerText='Barcode' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='itemGroup' headerText='ItemGroup' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='packing' headerText='Packing' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='salesUnit' headerText='SalesUnit' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='unitPrice' headerText='UnitPrice' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='image' headerText='Image' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='itemDiscountGroup' headerText='ItemDiscountGroup' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='itemFOCGroup' headerText='ItemFOCGroup' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='inventDimId' headerText='InventDimId' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='status' headerText='Status' minWidth='100' width='150' maxWidth='200' textAlign="Left" />
                        <ColumnDirective field='companyCode' headerText='CompanyCode' minWidth='50' width='70' maxWidth='100' textAlign="Left" />
                        <ColumnDirective field='companyId' headerText='companyId' minWidth='50' width='80' textAlign="Left" />
                        <ColumnDirective field='createAt' headerText='createAt' textAlign="Left" />
                        <ColumnDirective field='updatedAt' headerText='updatedAt' textAlign="Left" />
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

export default ItemListScreen;