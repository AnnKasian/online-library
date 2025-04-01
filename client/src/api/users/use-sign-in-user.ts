import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { usersService } from '#/providers/store';
import { StorageKey, StorageService } from '#/services/storage';
import { UserSignInDto } from '#/services/users';

import { userQueryKeys } from './user-query-keys';

StorageService.getInstance();

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
    onSuccess: (user) => {
      StorageService.getInstance().set(StorageKey.TOKEN, user.id.toString());
      navigate(Route.ROOT);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};

export { useSignIn };
