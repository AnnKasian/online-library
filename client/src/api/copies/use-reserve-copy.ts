import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useServiceStore } from '#/providers/store';
import { CopyReserveDto } from '#/services/copies';

import { copyQueryKeys } from './copy-query-keys';

const useReserveCopy = () => {
  const queryClient = useQueryClient();
  const { copiesService } = useServiceStore();

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
export { useReserveCopy };
