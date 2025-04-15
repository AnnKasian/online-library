import { useNavigate } from 'react-router-dom';

import { UserUpdateDto, userUpdateDtoSchema } from '@/packages/user';

import { useAuth, useUpdateUser } from '#/api/users';
import { Route } from '#/libs/enums';
import { useAppForm } from '#/libs/hooks';
import { usePasswordUpdateStore } from '#/providers/store';

import { ErrorMessage } from '../atoms';
import { PageTemplate } from '../templates';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui';

const UserUpdate = (): JSX.Element => {
  const { data, isLoading, isError, error } = useAuth();
  const userUpdate = useUpdateUser();
  const navigate = useNavigate();

  const isPasswordChange = usePasswordUpdateStore(
    (state) => state.isPasswordChange,
  );

  const handleChangePassword = () => {
    usePasswordUpdateStore.getState().updateIsPasswordChange(true);
  };

  const form = useAppForm<UserUpdateDto>({
    schema: userUpdateDtoSchema,
    defaultValues: {
      email: data?.email,
      fullName: data?.fullName,
      oldEmail: data?.email ?? '',
    },
  });

  if (isError) {
    console.error(error);
    return <div>Error fetching book</div>;
  }

  const onSubmit = (updatedUser: UserUpdateDto) => {
    userUpdate.mutate(
      {
        ...updatedUser,
        oldEmail: data?.email || '',
      },
      {
        onError: (error: Error) => {
          const errorMessage = error.message;

          if (Array.isArray(errorMessage)) {
            form.setError('root', { message: errorMessage.join(', ') });
          } else {
            form.setError('oldPassword', { message: errorMessage });
          }
          usePasswordUpdateStore.getState().updateIsPasswordChange(true);
        },
      },
    );
    usePasswordUpdateStore.getState().updateIsPasswordChange(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  const handleDiscardClick = () => {
    navigate(Route.USER_PAGE);
    usePasswordUpdateStore.getState().updateIsPasswordChange(false);
  };

  return (
    <PageTemplate isLoading={isLoading} isForm>
      {data && (
        <div className={'flex justify-center items-center m-20'}>
          <Card size="form">
            <CardHeader>
              <CardTitle>Update profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form className={'flex flex-col gap-2'} onSubmit={handleSubmit}>
                <div>
                  Full name
                  <Input
                    id="fullName"
                    type="text"
                    {...form.control.register('fullName')}
                    required
                  />
                  {form.errors.fullName && (
                    <ErrorMessage message={form.errors.fullName.message} />
                  )}
                </div>
                <div>
                  Email
                  <Input
                    id="email"
                    type="text"
                    {...form.control.register('email')}
                    required
                  />
                  {form.errors.email && (
                    <ErrorMessage message={form.errors.email.message} />
                  )}
                </div>
                {isPasswordChange && (
                  <div>
                    <div>
                      Old Password
                      <Input
                        id="old-password"
                        type="password"
                        {...form.control.register('oldPassword')}
                        required
                      />
                      {form.errors.oldPassword && (
                        <ErrorMessage
                          message={form.errors.oldPassword.message}
                        />
                      )}
                    </div>
                    <div>
                      New Password
                      <Input
                        id="new-password"
                        type="password"
                        {...form.control.register('newPassword')}
                        required
                      />
                      {form.errors.newPassword && (
                        <ErrorMessage
                          message={form.errors.newPassword.message}
                        />
                      )}
                    </div>
                  </div>
                )}
                {!isPasswordChange && (
                  <div className={'flex justify-center m-2'}>
                    <Button
                      variant={'default'}
                      type="button"
                      onClick={handleChangePassword}
                    >
                      Change password
                    </Button>
                  </div>
                )}
                <div className={'flex justify-between'}>
                  <Button
                    variant={'default'}
                    type="submit"
                    disabled={!form.isDirty || !form.isValid}
                  >
                    Submit
                  </Button>
                  <Button
                    variant={'default'}
                    type="button"
                    onClick={handleDiscardClick}
                  >
                    Discard
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </PageTemplate>
  );
};
export { UserUpdate };
