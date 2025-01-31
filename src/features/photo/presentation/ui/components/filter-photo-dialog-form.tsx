import { GetPhotoForm, getPhotoSchema } from "@/common/types/get-photo-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { usePhotoStore } from "../.."
import { PhotoFilterEnum } from "@/common/enum/photo-filter-enum"
import { useState } from "react"


const FilterPhotoDialogForm = (
    {
        open,
        close,
        title,
        description,
        type,
    }: {
        open: boolean,
        close: () => void,
        title: string,
        description: string,
        type: PhotoFilterEnum,
    },
) => {
    const [showAlert, setShowAlert] = useState(false);
    const devices = usePhotoStore((state) => state.devices);
    const transDates = usePhotoStore((state) => state.transDates);
    const customerChains = usePhotoStore((state) => state.customerChains);
    const findPhotosByDeviceId = usePhotoStore.use.findPhotosByDeviceId();
    const findPhotosByFromToDate = usePhotoStore.use.findPhotosByFromToDate();
    const findPhotosByCustomerChain = usePhotoStore.use.findPhotosByCustomerChain();

    const form = useForm<GetPhotoForm>({
        resolver: zodResolver(getPhotoSchema),
    });

    // destructure form
    const { handleSubmit, formState, control } = form;
    // destructure formState
    const { errors } = formState;

    const onSubmit: SubmitHandler<GetPhotoForm> = async (data: GetPhotoForm) => {
        // clear alert
        setShowAlert(false);

        // filter photos by deviceId , fromDate, and toDate
        if (type === PhotoFilterEnum.byDeviceAndDate) {
            if (data.deviceId != null && data.fromDate != null && data.toDate != null) {
                // close dialog
                close();
                // call api
                await findPhotosByDeviceId(
                    data.fromDate,
                    data.toDate,
                    data.deviceId,
                );
            } else {
                // close dialog
                close();
                // show alert
                setShowAlert(true);
            }
        }
        // filter photos by customerChain , fromDate, and toDate
        if (type === PhotoFilterEnum.byCustomerChainAndDate) {
            if (data.customerChain != null && data.fromDate != null && data.toDate != null) {
                // close dialog
                close();
                // call api
                await findPhotosByCustomerChain(
                    data.fromDate,
                    data.toDate,
                    data.customerChain,
                );
            } else {
                // close dialog
                close();
                // show alert
                setShowAlert(true);
            }
        }
        // filter photos by fromDate and toDate
        if (type === PhotoFilterEnum.byFromAndToDate) {
            if (data.fromDate != null && data.toDate != null) {
                // close dialog
                close();
                // call api
                await findPhotosByFromToDate(
                    data.fromDate,
                    data.toDate
                );
            } else {
               // close dialog
               close();
               // show alert
               setShowAlert(true);
            }
        }

    };

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}>

            {/* show alert    */}            
            {showAlert && (
                <Alert severity="error" onClose={() => setShowAlert(false)}>
                    Form is not valid, please select all the required fields
                </Alert>
            )}

            <Dialog
                open={open}
                onClose={close}
            >
                <DialogTitle>{title}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                    {
                        (type === PhotoFilterEnum.byDeviceAndDate) && (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Controller
                                        name="deviceId"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="device-id"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.deviceId ? errors.deviceId.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a DeviceId</option>
                                                {devices.map((option) => (
                                                    <option key={option.deviceId} value={option.deviceId}>
                                                        {option.deviceId}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Controller
                                        name="fromDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="from-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.fromDate ? errors.fromDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a FromDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                    <Controller
                                        name="toDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="to-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.toDate ? errors.toDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a ToDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                </Box>
                            </>
                        )
                    }

                    {
                        (type === PhotoFilterEnum.byFromAndToDate) && (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                    <Controller
                                        name="fromDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="from-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.fromDate ? errors.fromDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a FromDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                    <Controller
                                        name="toDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="to-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.toDate ? errors.toDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a ToDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />
                                </Box>


                            </>
                        )
                    }

                    {
                        (type === PhotoFilterEnum.byCustomerChainAndDate) && (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Controller
                                        name="customerChain"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="customer-chain"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.customerChain ? errors.customerChain.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a Customer Chain</option>
                                                {customerChains.map((option) => (
                                                    <option key={option.customerChain} value={option.customerChain}>
                                                        {option.customerChain}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Controller
                                        name="fromDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="from-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.fromDate ? errors.fromDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a FromDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                    <Controller
                                        name="toDate"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="to-data"
                                                type="text"
                                                size="small"
                                                select
                                                slotProps={{
                                                    select: {
                                                        native: true,
                                                    },
                                                }}
                                                helperText={errors.toDate ? errors.toDate.message : null}
                                                sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                                            >
                                                <option aria-label="None" value="" >Select a ToDate</option>
                                                {transDates.map((option) => (
                                                    <option key={option.transDate} value={option.transDate}>
                                                        {option.transDate}
                                                    </option>
                                                ))}
                                            </TextField>

                                        )}
                                    />

                                </Box>

                            </>
                        )
                    }


                </DialogContent>

                <DialogActions>
                    <Button onClick={close}>Close</Button>
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)()}>Submit</Button>
                </DialogActions>

            </Dialog>
        </Box>

    )
}

export default FilterPhotoDialogForm;