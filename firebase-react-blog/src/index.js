import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, amber,lime,teal } from '@material-ui/core/colors';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary:{
            main:teal[600],
            light:teal[400],
            dark:teal[700]
        },
    },
    typography: {
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 1000,
    },
});
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Root />
    </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
