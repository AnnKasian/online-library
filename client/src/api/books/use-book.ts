import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { booksService } from '#/providers/store';

import { bookQueryKeys } from './book-query-keys';

const useBook = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: bookQueryKeys.detail(Number(id)),
    queryFn: async () => {
      return await booksService.get(Number(id));
    },
    retry: 1,
  });
};

export { useBook };
