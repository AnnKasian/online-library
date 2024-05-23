import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '#/app';
import { Root } from '#/components/pages';
import { Route } from '#/libs/enums';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: Route.ROOT,
      element: <App />,
      children: [
        {
          path: Route.ROOT,
          element: <Root />,
        },
        {
          path: Route.OTHER,
          element: <Navigate to={Route.ROOT} />,
        },
      ],
    },
  ]);

export { createAppRouter };
