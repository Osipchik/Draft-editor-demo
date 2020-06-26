import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from "notistack";
import { uploadMessage } from './uploadMessage';
import '../../../styles/Uploader.css';
import '../../../styles/Card.css';


function Loading() {
    return(
        <div className="d-flex justify-content-center">
            <CircularProgress className="text-center"/>
        </div>
    )
}

const beforeUpload = (file, maxSize, handleError) => {
    const isAvailableType = file.type === 'image/jpeg' 
        || file.type === 'image/png' 
        || file.type === 'image/tiff' 
        || file.type === 'image/gif';
    
    if (!isAvailableType) {
        handleError('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
        handleError(`Image must smaller than ${maxSize} MB!`);
    }
    return isAvailableType && isLt2M;
}

export const UploadImage = (props) => {
    const {previewImageUrl, maxSize, className, cropped, onChange} = props;
    const [loading, setLoading] = useState(false);
    const inputRef = React.createRef();

    const handleChange = e => {
        let file = e.target.files[0]
        if (!beforeUpload(file, maxSize, (message) => showError(message))) {
            return
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadstart = function () {
            setLoading(true);
        }

        reader.onloadend = function () {
            setLoading(false);
            onChange(reader.result, file);
        }
    };

    const { enqueueSnackbar } = useSnackbar();
    const showError = (message) => {
        enqueueSnackbar(message, {
            variant: 'error',
        });
    };
    
    const loadingMessage = (
        <div className="text-center">
            <Loading/>
            <Typography component="div" className="text-center text-dark">
                <Box
                    fontWeight="fontWeightRegular"
                    fontSize="body2.fontSize"
                    textAlign="center"
                    m={1}>
                    Uploding...
                </Box>
            </Typography>
        </div>
    );
    
    const uploadButton = (
        <div className="w-100 center">
            {loading ? loadingMessage : uploadMessage(maxSize)}
        </div>
    );
        
    const image = cropped 
        ? <CardMedia className="uploader-image" image={previewImageUrl} />
        : <div className="w-100 bg-media py-2">
              <img src={previewImageUrl} className="media m-auto d-block" alt="img"/>
          </div>;

    const triggerInput = event => {
        event.persist();
        inputRef.current.click()
    }

    return (
        <div className={className}>
            <div className="drag-n-drop" onClick={triggerInput}>
                <input 
                        id="file-input" 
                        type="file" 
                        accept="image/jpg, image/png, image/tiff, image/gif"
                        ref={inputRef}
                        onChange={handleChange}
                    />
                {previewImageUrl ? image : uploadButton}
            </div>
        </div>
    );
}