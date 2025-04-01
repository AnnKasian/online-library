import { useQuery } from '@tanstack/react-query';

import { copiesService } from '#/providers/store';

import { copyQueryKeys } from './copy-query-keys';

const useCopies = () => {
  return useQuery({
    queryKey: copyQueryKeys.all,
    queryFn: async () => {
      return await copiesService.getReserved();
    },
    retry: 1,
  });
};

export { useCopies };
