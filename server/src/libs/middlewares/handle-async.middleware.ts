import { RequestHandler } from 'express';

const handleAsync = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  handler: (
    ...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery>>
  ) => void | Promise<void>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (request, response, next) => {
    void (async () => {
      try {
        await handler(request, response, next);
        next();
      } catch (error) {
        next(error);
      }
    })();
  };
};

export { handleAsync };
