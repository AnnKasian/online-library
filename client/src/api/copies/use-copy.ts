import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { copiesService } from '#/providers/store';

import { copyQueryKeys } from './copy-query-keys';

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
