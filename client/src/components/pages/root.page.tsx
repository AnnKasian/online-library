import { useCallback, useEffect } from 'react';

import { UserSignUpDto } from '@/packages/user';

import { HelloWorld, Loader } from '#/components/atoms';
import { UserPaper } from '#/components/molecules';
import { PageTemplate } from '#/components/templates';
import { DataStatus } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { usersActions } from '#/slices/users';

import { UserCreateForm } from '../organisms';

const Root = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, getStatus, createStatus } = useAppSelector(({ users }) => ({
    user: users.user,
    getStatus: users.dataStatus.get,
    createStatus: users.dataStatus.create,
  }));

  const isGetLoading = getStatus === DataStatus.PENDING;
  const isCreateLoading = createStatus === DataStatus.PENDING;

  useEffect(() => {
    void dispatch(usersActions.get(1));
  }, [dispatch]);

  const handleSubmit = useCallback(
    (payload: UserSignUpDto) => {
      void dispatch(usersActions.create(payload));
    },
    [dispatch],
  );

  return (
    <PageTemplate>
      {isGetLoading || !user ? (
        <Loader />
      ) : (
        <>
          <HelloWorld />
          <UserPaper name={user.name} />
          <UserCreateForm onSubmit={handleSubmit} loading={isCreateLoading} />
        </>
      )}
    </PageTemplate>
  );
};

export { Root };
