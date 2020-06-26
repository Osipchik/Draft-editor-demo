import React, {useState} from 'react'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { UploadImage } from '../../Uploader/UploadImage';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
  });

export default function AddImage(props) {
    const [url, setUrl] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [image, setImage] = useState(null);

    const handleClick = event => setAnchorEl(event.currentTarget);
    
    const handleClose = (action) => {
        setAnchorEl(null);
        if(url && action){
            props.insert({url: url, file: image}, 'image');
        }
        setUrl('');
        setImage(null);
    };

    const onChange = (src, file) =>{
        setUrl(src);
        setImage(file);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover-image' : undefined;
    const classes = open ? "tool-item-active" : "tool-item";

    return (
        <div>
            <Tooltip TransitionComponent={Zoom} title="add image" placement="top">
                <IconButton aria-label="image" className={`${classes}`} onClick={handleClick}>
                    <PhotoSizeSelectActualIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                id={id}
                open={open}
                TransitionComponent={Transition}    
                onClose={() => handleClose(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Select image"}</DialogTitle>
                <DialogContent>
                    <UploadImage 
                                onChange={(src, file) => onChange(src, file)} 
                                maxSize={4} 
                                cropped={false} 
                                previewImageUrl={url}/>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} variant="outlined" color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}