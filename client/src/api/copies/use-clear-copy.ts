import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { IdDto } from '@/libs/types';

import { Route } from '#/libs/enums';
import { copiesService } from '#/providers/store';

import { copyQueryKeys } from './copy-query-keys';

const useCopy = ({ id }: IdDto) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return copiesService.clear(id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: copyQueryKeys.detail(id) });
    },
    onSuccess: () => {
      navigate(Route.MY_COPIES);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: copyQueryKeys.detail(id),
      });
    },
  });
};

export { useCopy };
