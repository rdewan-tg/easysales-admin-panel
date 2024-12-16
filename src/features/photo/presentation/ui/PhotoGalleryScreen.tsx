import { useCallback, useEffect } from "react";
import { usePhotoStore } from "..";
import {  Box, Backdrop, CircularProgress } from "@mui/material";
import LightGallery from 'lightgallery/react';

// LIGHT GALLERY
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";


const PhotoGalleryScreen = () => {

    const getAllPhotos = usePhotoStore.use.getPhotos();
    const photos = usePhotoStore((state) => state.photos);
    const isLoading = usePhotoStore((state) => state.isLoading);


    useEffect(() => {
        async function fetchPhotos() {
            await getAllPhotos();
        }
        fetchPhotos();
    }, []);



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