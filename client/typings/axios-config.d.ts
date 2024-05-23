import { ClientContext } from '#/providers/client';

declare module 'axios' {
  interface AxiosRequestConfig {
    context?: ClientContext;
  }
}

export {};
