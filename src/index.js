import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/common/_tailwind.scss'
import { Provider } from 'react-redux';
import {persistor, store} from "./store/makeStore";
import {PersistGate} from "redux-persist/integration/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GoogleOAuthProvider clientId="531681651652-mt0rmg476frdmmrhdka5g07810oridb1.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
