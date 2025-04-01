import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useServiceStore } from '#/providers/store';
import { CopyCreateDto } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const useCreateCopy = () => {
  const queryClient = useQueryClient();
  const { copiesService } = useServiceStore();

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
