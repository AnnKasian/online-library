import { Middleware, isRejected } from '@reduxjs/toolkit';

import { ExceptionMessage } from '#/libs/enums';
import { NotificationsService } from '#/services/notification';

const handleErrorMiddleware: () => Middleware = () => {
  return () => {
    return (next) => {
      return (action: unknown) => {
        if (!action || typeof action !== 'object' || !('error' in action)) {
          return next(action);
        }

        let errorMessage: string | undefined;

        if (isRejected(action)) {
          errorMessage = action.error.message;

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
