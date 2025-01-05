import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { apiClient } from '#/providers/client';
import { UserSignInDto, UsersService } from '#/services/users';

import { userQueryKeys } from './user-query-keys';

const usersService = new UsersService(apiClient);

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newUser: UserSignInDto) => {
      return usersService.signIn(newUser);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryKeys.all });
    },
    onSuccess: () => {
      navigate(Route.ROOT);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

export { useSignIn };
