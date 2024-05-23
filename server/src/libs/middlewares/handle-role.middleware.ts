import { RequestHandler } from 'express';

import { UserExceptionMessage, UserRole } from '#/packages/user';

import { HttpCode } from '../enums';
import { HttpException } from '../exceptions';

const handleRole = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  role: UserRole,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (request, _response, next) => {
    const user = request.user;
    if (user.role === role) {
      next();
      return;
    }
    next(new HttpException(HttpCode.FORBIDDEN, UserExceptionMessage.USER_ROLE));
  };
};

export { handleRole };
