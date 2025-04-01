import { useQuery } from '@tanstack/react-query';

import { useServiceStore } from '#/providers/store';

import { copyQueryKeys } from './copy-query-keys';

const useCopies = () => {
  const { copiesService } = useServiceStore();
  return useQuery({
    queryKey: copyQueryKeys.all,
    queryFn: async () => {
      return await copiesService.getReserved();
    },
    retry: 1,
  });
};

export { useCopies };
