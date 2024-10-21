import { AxiosError } from 'axios';

import { ExceptionMessage, HttpCode } from '#/libs/enums';

const handleError = () => {
  return (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const data: unknown = error.response.data;

      if (error.response.status === Number(HttpCode.UNAUTHORIZED)) {
        throw new Error(HttpCode.UNAUTHORIZED.toString());
      }

      if (
        typeof data === 'object' &&
        data &&
        'message' in data &&
        typeof data.message === 'string'
      ) {
        throw new Error(data.message);
      }
    }

    throw new Error(ExceptionMessage.UNKNOWN_EXCEPTION);
  };
};

export { handleError };
