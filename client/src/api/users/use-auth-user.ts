import { useQuery } from '@tanstack/react-query';

import { usersService } from '#/providers/store';

import { userQueryKeys } from './user-query-keys';

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
