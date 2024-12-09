import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Slide, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateCompanyForm, createCompanySchema } from "../../domain/create-company-form";
import { mapCreateCompanyFormToDto } from "../../domain";
import { useCompanyStore } from "..";
import LoadingButton from "@mui/lab/LoadingButton";
import { AddBusiness } from "@mui/icons-material";
import { useEffect, useState } from "react";
// import { DevTool } from "@hookform/devtools";

const countries = [
    {
        name: "Nigeria",
        countryCode: "NG",
        companyCode: "NG",
        currencyCode: "NGNSD",
        timeZone: "Africa/Lagos",       
    },
    {
        name: "Ghana",
        countryCode: "GH",
        companyCode: "GHED",
        currencyCode: "GHS",
        timeZone: "Africa/Accra",
    },
    {
        name: "Kenya",
        countryCode: "KE",
        companyCode: "KEWS",
        currencyCode: "KES",
        timeZone: "Africa/Nairobi",
    },
]


const CreateCompanyPage = () => {
const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);

    const createCompany = useCompanyStore.use.createCompany();
    const errorMessage = useCompanyStore((state) => state.error);

     // observe error state and display error message
     useEffect(() => {
        if (errorMessage) {
            handleErrorSnackbarClick();
        }
    }, [errorMessage]);

    const form = useForm<CreateCompanyForm>({
        resolver: zodResolver(createCompanySchema),
    })

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
    }

    // destructure form
    const { handleSubmit, formState, control, setValue } = form;
    // destructure formState
    const { errors, isSubmitting} = formState;

    const onSubmit: SubmitHandler<CreateCompanyForm> = async (formData: CreateCompanyForm) => {
        const data = mapCreateCompanyFormToDto(formData);
        createCompany(data);
    }

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',
                    height: '100vh',
                    width: '100vw',
                    gap: 1.4,
                    p: 2,
                    backgroundColor: (theme) => theme.palette.background.default,
                }
            }
        >
            <Typography variant="h5">Create Company</Typography>
            

            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        id="name"
                        label="Name"
                        type="name"
                        variant="outlined"
                        required={true}
                        error={!!errors.name} // Set error state
                        helperText={errors.name ? errors.name.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="address"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="address"
                        label="Address"
                        type="text"
                        variant="outlined"
                        required={true}
                        error={!!errors.address} // Set error state
                        helperText={errors.address ? errors.address.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        required={true}
                        error={!!errors.email} // Set error state
                        helperText={errors.email ? errors.email.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="phone"
                        label="Phone"
                        type="text"
                        variant="outlined"
                        required={true}
                        error={!!errors.phone} // Set error state
                        helperText={errors.phone ? errors.phone.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="country"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="country"
                        label="Country"
                        type="text"
                        variant="outlined"
                        select
                        required={true}
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                        error={!!errors.country} // Set error state
                        helperText={errors.country ? errors.country.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                        onChange={(e) =>{
                            const selectedCountry = countries.find((country) => country.name === e.target.value);
                            if (selectedCountry) {
                                setValue('countryCode', selectedCountry.countryCode);
                                setValue('companyCode', selectedCountry.companyCode);
                                setValue('companySetting.currencyCode', selectedCountry.currencyCode);
                                setValue('companySetting.timeZone', selectedCountry.timeZone);
                            }
                            field.onChange(e);

                        }}
                    >
                        {
                            countries.map((country) => (
                            <option key={country.name} value={country.name}>{country.name}</option>
                        ))}
                        </TextField>
                )}
            />

            <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="country_code"
                        type="text"
                        variant="outlined"
                        required={true}
                        disabled
                        error={!!errors.countryCode} // Set error state
                        helperText={errors.countryCode ? errors.countryCode.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="companyCode"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="company_code"
                        type="text"
                        variant="outlined"
                        disabled
                        error={!!errors.companyCode} // Set error state
                        helperText={errors.companyCode ? errors.companyCode.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="companySetting.timeZone"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="time_zone"
                        type="text"
                        variant="outlined"
                        disabled
                        error={!!errors.companySetting?.timeZone} // Set error state
                        helperText={errors.companySetting?.timeZone ? errors.companySetting?.timeZone.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <Controller
                name="companySetting.currencyCode"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="currency_code"
                        type="text"
                        variant="outlined"
                        disabled
                        error={!!errors.companySetting?.currencyCode} // Set error state
                        helperText={errors.companySetting?.currencyCode ? errors.companySetting?.currencyCode.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <LoadingButton
                loading={isSubmitting}
                loadingPosition="center"
                startIcon={< AddBusiness />}
                variant={"contained"}
                disabled={isSubmitting}
                type="submit"
                sx={
                    {
                        width: '100%',
                        maxWidth: 180,
                        marginTop: 2,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                        }
                    }
                }
            >
                Create
            </LoadingButton>
            {/* <DevTool control={control} /> */}

            {/* Display global error */}
            {errorMessage && (
                <Snackbar
                    open={openErrorSnackBar}
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

export default CreateCompanyPage;