import { useQuery } from '@tanstack/react-query';

import { booksService } from '#/providers/store';
import { BooksPageDto } from '#/services/books';

import { bookQueryKeys } from './book-query-keys';

const useBooks = () => {
  return useQuery<BooksPageDto>({
    queryKey: bookQueryKeys.all,
    queryFn: async () => {
      return await booksService.getAll();
    },
    retry: 1,
  });
};

export { useBooks };
