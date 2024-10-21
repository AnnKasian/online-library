import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';

import { UserSignUpDto } from '@/packages/user';

import { UserSignUpForm } from '#/components/organisms';
import { PaperTemplate } from '#/components/templates';
import { DataStatus, Route } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { usersActions } from '#/slices/users';

import { Button } from '../atoms';

const SignUp = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ users }) => ({
    dataStatus: users.dataStatus.register,
  }));

  const handleSubmit = (payload: UserSignUpDto) => {
    void dispatch(usersActions.signUp(payload))
      .unwrap()
      .then(() => {
        navigate(Route.BOOKS);
      });
  };

  return (
    <PaperTemplate title="Sign up">
      <UserSignUpForm
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
        <Button to={Route.SIGN_IN}>Sign in</Button>
      </Box>
    </PaperTemplate>
  );
};

export { SignUp };
