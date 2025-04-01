import { useQuery } from '@tanstack/react-query';

import { useServiceStore } from '#/providers/store';

import { userQueryKeys } from './user-query-keys';

const useAuth = () => {
  const { usersService } = useServiceStore();
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: async () => {
      return await usersService.authenticate();
    },
    retry: 1,
  });
};

export { useAuth };
