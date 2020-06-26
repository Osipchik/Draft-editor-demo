import React from 'react';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export const uploadMessage = (maxSize) => {
    return(
        <div className="text-center align-middle">
            <Paper elevation={3} className="icon-size rounded-circle mx-auto">
                <PhotoSizeSelectActualIcon className="mt-icon"/>
            </Paper>
            <Typography component="div" className="text-center text-dark">
                <Box
                    fontWeight="fontWeightLight"
                    fontSize="body2.fontSize"
                    textAlign="center"
                    m={1}>
                    Click or drag file to this area to upload.
                </Box>
                <Box
                    fontWeight="fontWeightLight"
                    fontSize="caption.fontSize"
                    textAlign="center"
                    m={1}>
                    {`It must be a JPG, PNG, GIF, WEBP or TIFF, no larger than ${maxSize} MB.`}
                </Box>
            </Typography>
        </div>
    )
}