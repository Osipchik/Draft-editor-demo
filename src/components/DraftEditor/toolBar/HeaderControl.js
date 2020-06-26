import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import { HEADER_TYPES } from './constants';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import '../../../../styles/Editor.css';

export default function HeaderSelect(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [format, setFormat] = React.useState(null);

    const open = Boolean(anchorEl);
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleItemClick = item => {
        handleClose();
        setFormat(item);
        props.onToggle(item.style)
    }
    
    const { editorState } = props;
    const selection = editorState.getSelection();
    const headerType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    const fomatLabel = (
        format === null 
            ? <FormatSizeIcon/> 
            :  <div onClick={() => handleItemClick(format)} className={format.style === headerType ? "primary-main" : "header"}>
                    {format.label}
                </div>
    );

    return (
        <div className="row mx-2 my-auto py-auto header-selector">
            <div className="mx-1 my-auto">
                {fomatLabel}
            </div>
            <div className="divider"/>
            <IconButton aria-controls="fade-menu" aria-haspopup="true" className="my-auto" size="small" onClick={handleClick}>
                <ArrowDropDownIcon fontSize="inherit" />
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Grow}>
                {HEADER_TYPES.map((item) =>
                    <MenuItem key={item.label} onClick={() => handleItemClick(item)} className={item.style === headerType ? "primary-main" : "header"}>
                        {item.label}
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}

// {/* <IconButton
//                         size="small"
//                         key={item.label}
//                         onClick={() => props.onToggle(item.style)}
//                         aria-label={item.label}
//                         color={item.style === headerType ? "secondary" : "primary"}>
//                         {item.icon}
//                     </IconButton> */}