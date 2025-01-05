import axios from 'axios';

import { handleAuth, handleError } from './libs/middlewares';

const createAppClient = () => {
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const client = axios.create({
    baseURL: baseUrl,
  });

  client.interceptors.response.use((response) => response, handleError());
  client.interceptors.request.use(handleAuth());

  return client;
};

const apiClient = createAppClient();

export { apiClient };
