import {
  Action,
  Middleware,
  ThunkMiddleware,
  Tuple,
  configureStore,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';
import { UsersService } from '#/services/users/users.service';
import { usersReducer } from '#/slices/users';

import { handleErrorMiddleware } from './libs/middlewares';
import { AppReducers, ExtraArgument } from './libs/types';

const createAppStore = (client: AxiosInstance) => {
  const extra: ExtraArgument = {
    storageService: StorageService.getInstance(),
    notificationService: NotificationsService.getInstance(),
    usersService: new UsersService(client),
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
