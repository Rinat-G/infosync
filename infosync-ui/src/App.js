import React from 'react'
import SwipeableTabs from "./app/tabs/SwipeableTabs";
import './css/App.css';
import AuthIndex from "../AuthIndex";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#212121',
        },
    },

});


function App() {
    return (
        <ThemeProvider theme={darkTheme}>
           <AuthIndex/>
        </ThemeProvider>
    );
}

export default App;