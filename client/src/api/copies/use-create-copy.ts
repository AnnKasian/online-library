import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '#/providers/client';
import { CopiesService, CopyCreateDto } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const copiesService = new CopiesService(apiClient);

const useCreateCopy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCopy: CopyCreateDto) => {
      return copiesService.create(newCopy);
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
