import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './homeView';

const root = ReactDOM.createRoot(document.getElementById('root'));
let state = 0;

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
