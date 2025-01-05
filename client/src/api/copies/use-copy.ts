import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { apiClient } from '#/providers/client';
import { CopiesService } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const copiesService = new CopiesService(apiClient);

const useCopy = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: copyQueryKeys.detail(Number(id)),
    queryFn: async () => {
      return await copiesService.getByBook(Number(id));
    },
    retry: 1,
  });
};

export { useCopy };
