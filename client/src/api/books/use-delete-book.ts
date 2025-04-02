import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { useServiceStore } from '#/providers/store';

import { bookQueryKeys } from './book-query-keys';

const useDeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { booksService } = useServiceStore();

  return useMutation({
    mutationFn: async () => {
      await queryClient.cancelQueries({
        queryKey: bookQueryKeys.detail(Number(id)),
      });
      return booksService.delete(Number(id));
    },
    onSuccess: () => {
      navigate(Route.BOOKS);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: bookQueryKeys.all,
      });
      navigate(Route.BOOKS);
    },
  });
};

export { useDeleteBook };
