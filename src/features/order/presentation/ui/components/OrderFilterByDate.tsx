import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useOrderStore } from "../..";
import { GetOrderCreatedDatesForm, getOrderCreatedDatesSchema } from "@/common/types/get-order-created-date-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";


const OrderFilterByDate = ({
    open,
    close,
    title,
    description,
}: {
    open: boolean,
    close: () => void,
    title: string,
    description: string,
},) => {

    const getOrderCreatedDates = useOrderStore.use.getOrderCreatedDates();
    const getSalesHeaderByCompanyDateRange = useOrderStore.use.getSalesHeaderByCompanyDateRange();
    const orderCreatedDates = useOrderStore((state) => state.orderCreatedDates);

    useEffect(() => {

        async function fetchCreatedDates() {
            await getOrderCreatedDates();
        }
        fetchCreatedDates();
    }, []);

    const form = useForm<GetOrderCreatedDatesForm>({
        resolver: zodResolver(getOrderCreatedDatesSchema),
    })

    const { control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit: SubmitHandler<GetOrderCreatedDatesForm> = async (data: GetOrderCreatedDatesForm) => {
        await getSalesHeaderByCompanyDateRange(data);
    }

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}>

            <Dialog
                open={open}
                onClose={close}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>

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
                                {orderCreatedDates.map((option) => (
                                    <option key={option.createAt} value={option.createAt}>
                                        {option.createAt}
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
                                {orderCreatedDates.map((option) => (
                                    <option key={option.createAt} value={option.createAt}>
                                        {option.createAt}
                                    </option>
                                ))}
                            </TextField>

                        )}
                    />
                </DialogContent>

            </Dialog>
        </Box>

    );
}

export default OrderFilterByDate;