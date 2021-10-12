import React from 'react';
import ReactDOM from 'react-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/vendors/1.3.0/css/line-awesome.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './core/context/Store';
import { AuthProvider } from './core/hooks/useAuth';
import { NotificationsProvider } from '@mantine/notifications';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationsProvider position="top-right" zIndex={2077}>
        <AppProvider>
          <App />
        </AppProvider>
      </NotificationsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
