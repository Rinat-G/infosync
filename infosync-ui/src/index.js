import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from "./App";

// const theme = createMuiTheme({
//   palette: {
//     background: {
//       // Purple and green play nicely together.
//       default: '#121212',
//     }
//   }
// });
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

