import { RequestHandler } from 'express';

import { UserExceptionMessage, UsersService } from '#/packages/user';

import { HttpCode } from '../enums';
import { HttpException } from '../exceptions';

const handleAuth = (
  modules: {
    usersService: UsersService;
  },
  options: {
    omitRoutes?: string[];
  } = {},
): RequestHandler => {
  const { usersService } = modules;
  const { omitRoutes } = options;

  return (request, _response, next) => {
    if (omitRoutes?.some((route) => request.url.includes(route))) {
      next();

      return;
    }

    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')[1];
    const id = Number(token);

    if (isNaN(id)) {
      throw new HttpException(
        HttpCode.UNAUTHORIZED,
        UserExceptionMessage.USER_UNAUTHORIZED,
      );
    }

    void usersService
      .getByFilter({ id })
      .then((user) => {
        request.user = user;

        next();
      })
      .catch(() => {
        next(
          new HttpException(
            HttpCode.UNAUTHORIZED,
            UserExceptionMessage.USER_UNAUTHORIZED,
          ),
        );
      });
  };
};

export { handleAuth };
