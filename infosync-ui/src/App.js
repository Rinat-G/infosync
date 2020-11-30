import React from 'react'
import SwipeableTabs from "./app/tabs/SwipeableTabs";
import './css/App.css';
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
            <SwipeableTabs/>
        </ThemeProvider>
    );
}

export default App;