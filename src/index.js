import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// src/index.js
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext'; // if needed
import './firebase';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <
    React.StrictMode >
    <
    AuthProvider >
    <
    App / >
    <
    /AuthProvider> < /
    React.StrictMode >
);