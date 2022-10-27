import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalState } from './contexts/ModalContext';
import { LoginState } from './contexts/LoginContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <LoginState>
<ModalState>
    <App />
</ModalState></LoginState>
</BrowserRouter>
);
