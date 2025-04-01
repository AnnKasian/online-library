import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reflect-metadata';

// import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';

import '../style.css';
import { ReactQueryProvider } from './providers/react-query';
import { createAppRouter } from './providers/router';

StorageService.getInstance(localStorage);
// NotificationsService.getInstance(toast);

const router = createAppRouter();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactQueryProvider>
    <RouterProvider router={router} />
  </ReactQueryProvider>,
);
