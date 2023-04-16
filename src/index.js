import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyB91Qw6GqOEBJjpBLauI_Cu33gR0iXQayg",
  authDomain: "randomstore-f68f7.firebaseapp.com",
  databaseURL: "https://randomstore-f68f7-default-rtdb.firebaseio.com",
  projectId: "randomstore-f68f7",
  storageBucket: "randomstore-f68f7.appspot.com",
  messagingSenderId: "161677097094",
  appId: "1:161677097094:web:e870597e62306f2aba3907",
  measurementId: "G-Z862L32BPC"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider  firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
