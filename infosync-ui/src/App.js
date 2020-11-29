import React from 'react'
import TabIndex from "./template/TabIndex";
import './css/App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
            <TabIndex/>
        </ThemeProvider>
    );
}
export default App;