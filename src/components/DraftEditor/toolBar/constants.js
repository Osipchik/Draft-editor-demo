import React from 'react'
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import CodeIcon from '@material-ui/icons/Code';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TitleIcon from '@material-ui/icons/Title';

export const HEADER_TYPES = [
    { label: 'H1', style: 'header-one', icon: <h1><TitleIcon fontSize="inherit" /></h1> },
    { label: 'H2', style: 'header-two', icon: <h2><TitleIcon fontSize="inherit" /></h2> },
    { label: 'H3', style: 'header-three', icon: <h3><TitleIcon fontSize="inherit" /></h3> },
    { label: 'H4', style: 'header-four', icon: <h4><TitleIcon fontSize="inherit" /></h4> },
    { label: 'H5', style: 'header-five', icon: <h5><TitleIcon fontSize="inherit" /></h5> },
    { label: 'H6', style: 'header-six', icon: <h6><TitleIcon fontSize="inherit" /></h6> },
];

export const BLOCK_TYPES = [
    { label: 'Blockquote', style: 'blockquote', icon: <FormatQuoteIcon /> },
    { label: 'UL', style: 'unordered-list-item', icon: <FormatListBulletedIcon /> },
    { label: 'OL', style: 'ordered-list-item', icon: <FormatListNumberedIcon /> },
    { label: 'Code Block', style: 'code-block', icon: <CodeIcon /> }
];

export const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: <FormatBoldIcon /> },
    { label: 'Italic', style: 'ITALIC', icon: <FormatItalicIcon /> },
    { label: 'Underline', style: 'UNDERLINE', icon: <FormatUnderlinedIcon /> },
    { label: 'Monospace', style: 'CODE', icon: <FontDownloadIcon /> }
];