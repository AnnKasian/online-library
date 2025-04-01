import { useMutation, useQueryClient } from '@tanstack/react-query';

import { copiesService } from '#/providers/store';
import { CopyCreateDto } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const useCreateCopy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: number) => {
      return copiesService.delete(newCopy);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: copyQueryKeys.all });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: copyQueryKeys.all });
    },
  });
};
export { useCreateCopy };
