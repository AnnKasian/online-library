import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { booksService } from '#/providers/store';
import { BookCreateDto } from '#/services/books';

import { bookQueryKeys } from './book-query-keys';

const useCreateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newBook: BookCreateDto) => {
      return booksService.create(newBook);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: bookQueryKeys.all });
    },
    onSuccess: () => {
      navigate(Route.ROOT);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: bookQueryKeys.all });
    },
  });
};
export { useCreateBook };
