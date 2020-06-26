import React, { useState } from 'react'
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Grow from "@material-ui/core/Grow";
import { Button } from '@material-ui/core';
import {fade, withStyles} from "@material-ui/core/styles";


const LineInput = withStyles(theme => ({
    input: {
        borderRadius: 4,
        backgroundColor: theme.palette.textInput.main,
        position: 'relative',
        border: '1px solid #ced4da',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow', 'background-color']),
        '&:hover': {
            backgroundColor: theme.palette.textInput.light,
            borderColor: theme.palette.primary.light
        },
        '&:focus': {
            borderRadius: 4,
            backgroundColor: theme.palette.textInput.light,
            boxShadow: `${fade(theme.palette.primary.light, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const GetYouTubeUrl = (link) => {
    const youTube = 'https://www.youtube.com/';
    const watch = 'watch?v=';
    const embed = 'embed/';

    let url = undefined;
    if (link !== undefined){
        if(link.includes(youTube + embed)){
            url = link;
        }
        else if(link.includes(youTube + watch)){
            url = link.replace(watch, embed);
            url = url.includes('&') ? url.slice(0, url.indexOf('&') - url.length) : url;
        }
    }
    
    return url;
}

export default function AddVideo(props) {
    const [url, setUrl] = useState('');
    const [value, setValue] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(false);

    const handleClick = event => setAnchorEl(event.currentTarget);
    
    const handleClose = () => {
        setAnchorEl(null);
        if(url && !error){
            props.insert(url, 'video');
        }
        setUrl('');
        setValue('');
    };

    const onUrlChange = (link) => {
        setValue(link);
        setError(false);
        let urlId = GetYouTubeUrl(link);
        if(urlId){
            setUrl(urlId);
            setError(false)
        }
        else{
            setUrl('');
            setError(true)
        }
    };


    const open = Boolean(anchorEl);
    const id = open ? 'popover-video' : undefined;
    const classes = open ? "youtube-active" : "youtube";

    return (
        <div>
            <Tooltip TransitionComponent={Zoom} title="add video" placement="top">
                <IconButton aria-label="video" className={`${classes}`} onClick={handleClick}>
                    <YouTubeIcon />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <div className="my-2 px-2">
                    <Typography variant="body2" className="">Add link to video from YouTube.</Typography>
                    <LineInput
                            value={value}
                            onChange={(event) => onUrlChange(event.target.value)}
                            size="small mr-auto"
                            className="w-100 my-1"
                            placeholder="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                            variant="outlined"/>
                    <div className="row p-1">
                        <Typography component="div" className="row mt-1 text-danger mr-auto ml-2">
                            <Grow in={error}>
                                <Box
                                    fontSize="body2.fontSize"
                                    fontWeight="fontWeightRegular">
                                    Wrong link. Vodeo should be from YouTube.
                                </Box>
                            </Grow>
                        </Typography>
                        <Button 
                            size="small"
                            variant="outlined" 
                            color="primary" 
                            className="m-control mx-2"
                            onClick={() => handleClose()}>
                            Confirm
                        </Button>
                    </div>

                </div>
            </Popover>
        </div>
    )
}