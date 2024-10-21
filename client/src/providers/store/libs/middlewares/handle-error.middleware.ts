import { Middleware, MiddlewareAPI, isRejected } from '@reduxjs/toolkit';

import { ExceptionMessage, HttpCode } from '#/libs/enums';
import { NotificationsService } from '#/services/notification';
import { usersActions } from '#/slices/users';

import { AppDispatch } from '../types';

const handleErrorMiddleware: () => Middleware = () => {
  return ({ dispatch }: MiddlewareAPI<AppDispatch>) => {
    return (next) => {
      return (action: unknown) => {
        if (!action || typeof action !== 'object' || !('error' in action)) {
          return next(action);
        }

        let errorMessage: string | undefined;

        if (isRejected(action)) {
          errorMessage = action.error.message;

          if (errorMessage === HttpCode.UNAUTHORIZED.toString()) {
            void dispatch(usersActions.signOut());

            return next(action);
          }

          if (!errorMessage) {
            errorMessage = ExceptionMessage.UNKNOWN_EXCEPTION;
            console.error(action);
          }
        }

        if (errorMessage) {
          NotificationsService.getInstance().showError(errorMessage);
        }

        return next(action);
      };
    };
  };
};

export { handleErrorMiddleware };
