import { InternalAxiosRequestConfig } from 'axios';

import { StorageKey, StorageService } from '#/services/storage';

const handleAuth = () => {
  return (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { context } = config;

    if (!context?.avoidAuth) {
      const token = StorageService.getInstance().get(StorageKey.TOKEN);

      config.headers['authorization'] = `Bearer ${token}`;
    }

    return config;
  };
};

export { handleAuth };
