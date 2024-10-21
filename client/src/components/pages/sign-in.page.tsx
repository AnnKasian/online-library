import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

import { UserSignInDto } from '@/packages/user';

import { UserSignInForm } from '#/components/organisms';
import { PaperTemplate } from '#/components/templates';
import { DataStatus, Route } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { usersActions } from '#/slices/users';

import { Button } from '../atoms';

const SignIn = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ users }) => ({
    dataStatus: users.dataStatus.register,
  }));

  const handleSubmit = (payload: UserSignInDto) => {
    void dispatch(usersActions.signIn(payload))
      .unwrap()
      .then(() => {
        navigate(Route.BOOKS);
      });
  };

  return (
    <PaperTemplate title="Sign in">
      <UserSignInForm
        onSubmit={handleSubmit}
        loading={dataStatus === DataStatus.PENDING}
      />
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={theme.spacing(1)}
      >
        <Typography>Go to</Typography>
        <Button to={Route.SIGN_UP}>Sign up</Button>
      </Box>
    </PaperTemplate>
  );
};

export { SignIn };
