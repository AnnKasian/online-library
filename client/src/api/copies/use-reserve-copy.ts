import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '#/providers/client';
import { CopiesService, CopyReserveDto } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const copiesService = new CopiesService(apiClient);

const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookId }: CopyReserveDto) => {
      return await copiesService.reserve(bookId);
    },
    onMutate: async ({ bookId }: CopyReserveDto) => {
      await queryClient.cancelQueries({
        queryKey: copyQueryKeys.detail(bookId),
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: copyQueryKeys.all,
      });
    },
  });
};
export { useUpdateBook };
