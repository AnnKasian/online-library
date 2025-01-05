import { useQuery } from '@tanstack/react-query';

import { apiClient } from '#/providers/client';
import { UsersService } from '#/services/users';

import { userQueryKeys } from './user-query-keys';

const usersService = new UsersService(apiClient);

const useAuth = () => {
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: async () => {
      return await usersService.authenticate();
    },
    retry: 1,
  });
};

export { useAuth };
