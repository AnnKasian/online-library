import { useQuery } from '@tanstack/react-query';

import { copiesService } from '#/providers/store';

import { copyQueryKeys } from './copy-query-keys';

const useReservedCopies = () => {
  return useQuery({
    queryKey: copyQueryKeys.all,
    queryFn: async () => {
      return await copiesService.getAll();
    },
    retry: 1,
  });
};

export { useReservedCopies };
