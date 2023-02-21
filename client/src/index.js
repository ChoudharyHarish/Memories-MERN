import React from 'react';
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import { store } from './redux/store';
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="562375126831-krvvt4qlo8enp21ei1h3hbm7702mscuv.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </Provider>,
    document.getElementById("root"));