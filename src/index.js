import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { theme } from "./Theme";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css';


const rootElement = document.getElementById('root');

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{vertical: 'top',horizontal: 'center'}}>
            <App />
        </SnackbarProvider>
    </MuiThemeProvider>,
    rootElement
);