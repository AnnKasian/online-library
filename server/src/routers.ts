import { Router } from 'express';

import { BooksRouter } from './packages/books';
import { CopiesRouter } from './packages/copies';
import { UsersRouter } from './packages/user';

const createRouters = () => {
  const usersRouter = new UsersRouter();
  const booksRouter = new BooksRouter();
  const copiesRouter = new CopiesRouter(usersRouter, booksRouter);

  const useRoutes = (router: Router): void => {
    usersRouter.useRoutes();
    booksRouter.useRoutes();
    copiesRouter.useRoutes();

    router.use(UsersRouter.ROUTE, usersRouter.instance);
    router.use(BooksRouter.ROUTE, booksRouter.instance);
    router.use(CopiesRouter.ROUTE, copiesRouter.instance);
  };

  return [
    useRoutes,
    {
      usersRouter,
      booksRouter,
      copiesRouter,
    },
  ] as const;
};

export { createRouters };
