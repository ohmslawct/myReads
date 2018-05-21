import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
<CookiesProvider>
<MuiThemeProvider>
   <BrowserRouter>
      <App />
  </BrowserRouter>
</MuiThemeProvider>
</CookiesProvider>
  , document.getElementById('root')
);
