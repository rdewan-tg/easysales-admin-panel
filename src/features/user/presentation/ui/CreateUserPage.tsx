import { SignupForm, signupSchema } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Slide, Snackbar, SnackbarCloseReason, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PasswordFieldComponent from "./components/PasswordFieldComponent";
import { PersonAdd } from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useUserStore } from "..";
import { useEffect, useState } from "react";
import PasswordConfirmFieldComponent from "./components/PasswordConfirmFieldComponent";
import { BaseSnackBarComponent } from "@/common/components";
//import { DevTool } from "@hookform/devtools";



const CreateUserPage = () => {
    const [open, setOpen] = useState(false);
    const [openUserCreatedSnackBar, setOpenUserCreatedSnackBar] = useState(false);

    const companies = useUserStore((state) => state.companies);
    const isLoading = useUserStore((state) => state.isLoading);
    const isUserCreated = useUserStore((state) => state.isUserCreated);
    const errorMessage = useUserStore((state) => state.error);
    const getCompanies = useUserStore.use.getCompanies();
    const createUser = useUserStore.use.createUser();

    const handleSnackbarClick = () => {
        setOpen(true);
    };

    const handleUserCreatedSnackbarClick = () => {
        setOpenUserCreatedSnackBar(true);
    }
    const handleSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        // do not close the snackbar if the reason is 'clickaway'   
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleUserCreatedSnackbarClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        // do not close the snackbar if the reason is 'clickaway'   
        if (reason === 'clickaway') {
            return;
        }

        setOpenUserCreatedSnackBar(false);
    };

    // observe error state and display error message
    useEffect(() => {
        if (errorMessage) {
            handleSnackbarClick();
        }
    }, [errorMessage]);

    // observe user created state and display  message
    useEffect(() => {
        if (isUserCreated) {
            handleUserCreatedSnackbarClick();
        }
    }, [isUserCreated]);

    // fetch companies
    useEffect(() => {
        // fetch companies when the component mounts
        const fetchCompanies = async () => {
            if (!isLoading && companies.length === 0) {
                // Check if it's already loading or data exists
                await getCompanies();
            }
        };
        fetchCompanies();
    }, [isLoading, companies.length, getCompanies]);

    const form = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            companyId: undefined
        }
    });

    // destructure form
    const { handleSubmit, formState, control } = form;
    // destructure formState
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
        await createUser(data);
    };

    const variant = isSubmitting ? "outlined" : "contained";

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
            <Typography variant="h5">Create Users</Typography>

            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="name"
                        label="Name"
                        type="name"
                        variant="outlined"
                        required={true}
                        autoComplete="name"
                        error={!!errors.name} // Set error state
                        helperText={errors.name ? errors.name.message : null} // Display error message
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
                        autoComplete="email"
                        error={!!errors.email} // Set error state
                        helperText={errors.email ? errors.email.message : null} // Display error message
                        sx={{ width: '100%', maxWidth: 400 }}
                    />
                )}
            />

            <PasswordFieldComponent
                control={control}
                errors={errors}
                id="password"
                lable="Password"
            />

            <PasswordConfirmFieldComponent
                control={control}
                errors={errors}
                id="confirm_password"
                lable="Confirm Password"
            />

            <Controller
                name="companyId"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="companyId"
                        type="text"
                        select
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                        helperText={errors.companyId ? errors.companyId.message : null}
                        sx={{ width: '100%', maxWidth: 400 }}
                    >
                        <option aria-label="None" value="" >Please select a company</option>
                        {companies.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>

                )}
            />


            <LoadingButton
                loading={isSubmitting}
                loadingPosition="center"
                startIcon={<PersonAdd />}
                variant={variant}
                disabled={!isValid || isSubmitting}
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
                Create User
            </LoadingButton>

            {/* Display global error */}
            {errorMessage && (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    TransitionComponent={Slide}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleSnackbarClose}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>

            )}

            {isUserCreated && (
                <BaseSnackBarComponent
                    message={"User is added successfully."}
                    autoHideDuration={6000}
                    severity="success"
                    open={openUserCreatedSnackBar}
                    onClose={handleUserCreatedSnackbarClose}
                />

            )}

            {/* <DevTool control={control} /> */}
        </Box>

    );
};

export default CreateUserPage;