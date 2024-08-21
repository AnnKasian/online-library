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
import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';

StorageService.getInstance(localStorage);
NotificationsService.getInstance(toast);

const client = createAppClient();
const store = createAppStore(client);
const router = createAppRouter();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>,
);
