import {createMuiTheme} from "@material-ui/core";
import {teal, grey, blue} from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],
            light: blue[700],
            dark: blue[600]
        },
        // secondary: {
        //     main: '#FFFFFF',
        //     light: '#FFFFFF',
        //     dark: grey[800]
        // },
        green: {
            main: '#05A378',
            light: teal[400],
            dark: teal[600]
        },
        textInput: {
            main: grey[200],
            light: 'inherit',
            dark: grey[600]
        },
            secondary: {
                main: '#f44336',
                light: '#f44336',
                dark: '#d50000'
            }
    },

});