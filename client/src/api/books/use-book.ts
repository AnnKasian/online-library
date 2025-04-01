import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useServiceStore } from '#/providers/store';

import { bookQueryKeys } from './book-query-keys';

const useBook = () => {
  const { id } = useParams();
  const { booksService } = useServiceStore();

  return useQuery({
    queryKey: bookQueryKeys.detail(Number(id)),
    queryFn: async () => {
      return await booksService.get(Number(id));
    },
    retry: 1,
  });
};

export { useBook };
