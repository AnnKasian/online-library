import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reflect-metadata';

import '#/assets/styles/global.scss';
import { createAppClient } from '#/providers/client';
import { createAppRouter } from '#/providers/router';
import { createAppStore } from '#/providers/store';
import { createAppTheme } from '#/providers/theme';
import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';

StorageService.getInstance(localStorage);
NotificationsService.getInstance(toast);

const client = createAppClient();
const store = createAppStore(client);
const router = createAppRouter();
const theme = createAppTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastContainer />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>,
);
