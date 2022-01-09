import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from "@mui/material";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import './index.css';
import App from './App';
import store from "./redux/store";
import {orange, blue} from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                <SnackbarProvider>
                    <App/>
                </SnackbarProvider>
            </BrowserRouter>
                </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);