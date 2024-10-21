import {
  Action,
  Middleware,
  ThunkMiddleware,
  Tuple,
  configureStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { BooksService } from '#/services/books';
import { CopiesService } from '#/services/copies';
import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';
import { UsersService } from '#/services/users';
import { booksReducer } from '#/slices/books';
import { copiesReducer } from '#/slices/copies';
import { usersReducer } from '#/slices/users';

import { handleErrorMiddleware } from './libs/middlewares';
import { AppReducers, ExtraArgument } from './libs/types';

const createAppStore = (client: AxiosInstance) => {
  const extra: ExtraArgument = {
    storageService: StorageService.getInstance(),
    notificationService: NotificationsService.getInstance(),
    usersService: new UsersService(client),
    booksService: new BooksService(client),
    copiesService: new CopiesService(client),
  };

  return configureStore<
    AppReducers,
    Action,
    Tuple<
      [ThunkMiddleware<AppReducers, Action, ExtraArgument>, ...Middleware[]]
    >
  >({
    devTools: true,
    reducer: {
      users: usersReducer,
      books: booksReducer,
      copies: copiesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: extra,
        },
      }).concat(handleErrorMiddleware()),
  });
};

export { createAppStore };
