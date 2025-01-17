import { useCallback, useEffect } from "react";
import { usePhotoStore } from "..";
import { Box, Backdrop, CircularProgress, TextField } from "@mui/material";
import LightGallery from 'lightgallery/react';

// LIGHT GALLERY
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetPhotoForm, getPhotoSchema } from "@/common/types/get-photo-form";
import { SendOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";


const PhotoGalleryScreen = () => {

    const findPhotos = usePhotoStore.use.findPhotos();
    const getDevices = usePhotoStore.use.getDevices();
    const getTransDates = usePhotoStore.use.getTransDates();
    const photos = usePhotoStore((state) => state.photos);
    const devices = usePhotoStore((state) => state.devices);
    const transDates = usePhotoStore((state) => state.transDates);
    const isLoading = usePhotoStore((state) => state.isLoading);

    useEffect(() => {
        // fetch devices when the component mounts
        async function fetchDevices() {
            getDevices();
        }

        // fetch transDates when the component mounts
        async function fetchTransDates() {
            getTransDates();
        }
        fetchDevices();
        fetchTransDates();
    },[])

    const form = useForm<GetPhotoForm>({
        resolver: zodResolver(getPhotoSchema),
    });

    // destructure form
    const { handleSubmit, formState, control } = form;
    // destructure formState
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit: SubmitHandler<GetPhotoForm> = async (data: GetPhotoForm) => {
        await findPhotos(
            data.deviceId,
            data.transDate
        );

    };

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    const renderPhotos = useCallback(() => {
        return photos.map((item) => {
            return (
                <Box
                    key={item.id}
                    className="gallery-item"
                    data-src={item.photo}
                >
                    <img src={item.photo} alt="Gallery" style={{ width: '100%', height: 'auto' }} />
                </Box>
            );
        });
    }, [photos]);


    return (

        <Box>

            <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: 'block', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

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
                            defaultValue=""                            
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

                <Controller
                    name="transDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="trans-data"
                            type="text"
                            size="small"
                            select
                            defaultValue=""
                            slotProps={{
                                select: {
                                    native: true,
                                },
                            }}
                            helperText={errors.transDate ? errors.transDate.message : null}
                            sx={{ width: '100%', maxWidth: 200, margin: 1 }}
                        >
                            <option aria-label="None" value="" >Select a Date</option>
                            {transDates.map((option) => (
                                <option key={option.transDate} value={option.transDate}>
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
                            margin: 1,
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'secondary.main',
                            }
                        }
                    }
                >
                    Get Photos
                </LoadingButton>
            </Box>

            {isLoading ? (
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : null}



            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                mode="lg-zoom-in"
                elementClassNames="gallery-container"
            >
                {renderPhotos()}
            </LightGallery>

        </Box>
    );
}

export default PhotoGalleryScreen;