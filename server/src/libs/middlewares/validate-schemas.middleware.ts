import { RequestHandler } from 'express';
import { ZodError, z } from 'zod';

import { ExceptionMessage, HttpCode } from '../enums';
import { HttpException } from '../exceptions';

const validateSchemas = (schemas: {
  params?: z.ZodSchema;
  query?: z.ZodSchema;
  body?: z.ZodSchema;
}): RequestHandler<any, any, any, any> => {
  const { params, query, body } = schemas;

  return (request, _response, next) => {
    try {
      if (params) {
        request.params = params.parse(request.params) as Record<
          string,
          unknown
        >;
      }

      if (query) {
        request.query = query.parse(request.query) as Record<string, unknown>;
      }

      if (body) {
        request.body = body.parse(request.body) as unknown;
      }

      next();
    } catch (error) {
      const exception = error as ZodError;

      next(
        new HttpException(
          HttpCode.BAD_REQUEST,
          ExceptionMessage.VALIDATION_FAILED,
          {
            cause: {
              constraints: exception.errors.map(({ message }) => message),
            },
          },
        ),
      );
    }
  };
};

export { validateSchemas };
