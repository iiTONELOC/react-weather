import './index.css';
import React from 'react';
import App from './App/index';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './components';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
