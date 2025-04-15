import { Navigate, createBrowserRouter } from 'react-router-dom';

import { App } from '#/app';
import {
  AdminCopies,
  Book,
  BookCreate,
  BookUpdate,
  Books,
  SignIn,
  SignUp,
  UserCopies,
  UserPage,
} from '#/components/pages';
import { UserUpdate } from '#/components/pages/user-update.page';
import { Route } from '#/libs/enums';

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: Route.ROOT,
      element: <App />,
      children: [
        {
          path: Route.SIGN_IN,
          element: <SignIn />,
        },
        {
          path: Route.SIGN_UP,
          element: <SignUp />,
        },
        {
          path: Route.USER_PAGE,
          element: <UserPage />,
        },
        {
          path: Route.USER_UPDATE_$ID,
          element: <UserUpdate />,
        },
        {
          path: Route.BOOKS,
          element: <Books />,
        },
        {
          path: Route.BOOK_$ID,
          element: <Book />,
        },
        {
          path: Route.BOOKS_CREATE,
          element: <BookCreate />,
        },
        {
          path: Route.BOOKS_UPDATE_$ID,
          element: <BookUpdate />,
        },
        {
          path: Route.MY_COPIES,
          element: <UserCopies />,
        },
        {
          path: Route.COPIES,
          element: <AdminCopies />,
        },
        {
          path: Route.OTHER,
          element: <Navigate to={Route.BOOKS} />,
        },
        {
          path: Route.ROOT,
          element: <Navigate to={Route.BOOKS} />,
        },
      ],
    },
  ]);

export { createAppRouter };
