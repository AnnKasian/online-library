import { ErrorRequestHandler } from 'express';

import { LoggerPublisher } from '#/services/logger';

import { ExceptionMessage, HttpCode } from '../enums';
import { HttpException } from '../exceptions';

const handleError = (loggerPublisher: LoggerPublisher): ErrorRequestHandler => {
  return (exception, _request, response, _next) => {
    if (exception instanceof HttpException) {
      const { status, message, cause } = exception as HttpException;

      return response.status(exception.status).json({
        status,
        message,
        cause,
      });
    }

    const exceptionDetails =
      exception instanceof Error
        ? exception.stack ?? exception.message
        : JSON.stringify(exception);

    loggerPublisher.error(
      `${ExceptionMessage.UNKNOWN_EXCEPTION}\n${exceptionDetails}`,
    );

    return response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: ExceptionMessage.INTERNAL_SERVER_ERROR,
    });
  };
};

export { handleError };
