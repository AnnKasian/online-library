import { HttpCode } from '../enums';

class HttpException<
  Cause extends Record<string, unknown> = Record<string, unknown>,
> extends Error {
  readonly status: HttpCode;
  readonly cause?: Cause;

  constructor(
    status: HttpCode,
    message: string,
    options: { cause?: Cause } = {},
  ) {
    super(message, options);
    this.status = status;
    this.cause = options.cause;
  }
}

export { HttpException };
