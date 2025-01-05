import { useQuery } from '@tanstack/react-query';

import { apiClient } from '#/providers/client';
import { CopiesService } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const copiesService = new CopiesService(apiClient);

const useCopies = () => {
  return useQuery({
    queryKey: copyQueryKeys.all,
    queryFn: async () => {
      return await copiesService.getAll();
    },
    retry: 1,
  });
};

export { useCopies };
