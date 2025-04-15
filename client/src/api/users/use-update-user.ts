import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { Route } from '#/libs/enums';
import { useServiceStore } from '#/providers/store';
import { UserUpdateDto } from '#/services/users';

import { userQueryKeys } from './user-query-keys';

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { usersService } = useServiceStore();

  return useMutation({
    mutationFn: async (updatedUser: UserUpdateDto) => {
      await queryClient.cancelQueries({
        queryKey: userQueryKeys.detail({
          email: updatedUser.oldEmail,
          password: updatedUser.oldPassword ?? '',
        }),
      });
      return usersService.update(Number(id), updatedUser);
    },
    onMutate: async (updatedUser: UserUpdateDto) => {
      await queryClient.cancelQueries({
        queryKey: userQueryKeys.detail({
          email: updatedUser.oldEmail,
          password: updatedUser.oldPassword ?? '',
        }),
      });
      const previousUser = queryClient.getQueryData(
        userQueryKeys.detail({
          email: updatedUser.oldEmail,
          password: updatedUser.oldPassword ?? '',
        }),
      );
      queryClient.setQueryData(
        userQueryKeys.detail({
          email: updatedUser.oldEmail,
          password: updatedUser.oldPassword ?? '',
        }),
        updatedUser,
      );
      return { previousUser, updatedUser };
    },
    onSuccess: () => {
      navigate(Route.USER_PAGE);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};
export { useUpdateUser };
