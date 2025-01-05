import { useQuery } from '@tanstack/react-query';

import { apiClient } from '#/providers/client';
import { BooksPageDto, BooksService } from '#/services/books';

import { bookQueryKeys } from './book-query-keys';

const booksService = new BooksService(apiClient);

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
