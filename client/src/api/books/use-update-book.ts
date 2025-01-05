import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { getEndpoint } from '@/libs/helpers';

import { Route } from '#/libs/enums';
import { apiClient } from '#/providers/client';
import { BookUpdateDto, BooksService } from '#/services/books';

import { bookQueryKeys } from './book-query-keys';

const booksService = new BooksService(apiClient);

const useUpdateBook = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (updatedBook: BookUpdateDto) => {
      await queryClient.cancelQueries({
        queryKey: bookQueryKeys.detail(Number(id)),
      });
      return await booksService.update(Number(id), updatedBook);
    },
    onMutate: async (updatedBook) => {
      await queryClient.cancelQueries({
        queryKey: bookQueryKeys.detail(Number(id)),
      });
      const previousBook = queryClient.getQueryData(
        bookQueryKeys.detail(Number(id)),
      );
      queryClient.setQueryData(bookQueryKeys.detail(Number(id)), updatedBook);
      return { previousBook, updatedBook: updatedBook };
    },
    onSuccess: () => {
      if (id) {
        navigate(getEndpoint(Route.BOOK_$ID, { id }));
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
    },
  });
};
export { useUpdateBook };
