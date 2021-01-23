import React from 'react'
import './css/App.css';
import Routing from "../Routing";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#7b7f84',
        }
    },
});


function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Routing/>
        </ThemeProvider>
    );
}

export default App;