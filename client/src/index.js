import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {MoralisProvider} from "react-moralis"
import {AuthContextProvider} from "./contextApi/Auth"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId = {process.env.REACT_APP_MORALIS_APP_ID} serverUrl = {process.env.REACT_APP_MORALIS_SERVER_ID}>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
