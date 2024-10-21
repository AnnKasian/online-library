import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { Loader } from './components/atoms';
import { Header } from './components/organisms';
import { DataStatus, Route } from './libs/enums';
import { useAppDispatch, useAppSelector } from './libs/hooks';
import { UserRole } from './services/users';
import { usersActions } from './slices/users';

const PUBLIC_ROUTES: string[] = [Route.SIGN_IN, Route.SIGN_UP];

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = (): JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { user, dataStatus } = useAppSelector(({ users }) => ({
    user: users.user,
    dataStatus: users.dataStatus.authenticate,
  }));

  const loading =
    dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING;

  useEffect(() => {
    void dispatch(usersActions.authenticate());
  }, [dispatch]);

  if (!PUBLIC_ROUTES.includes(pathname) && dataStatus === DataStatus.REJECTED) {
    return <Navigate to={Route.SIGN_IN} />;
  }

  if (
    pathname.includes('admin') &&
    dataStatus === DataStatus.FULFILLED &&
    user?.role !== UserRole.ADMIN
  ) {
    return <Navigate to={Route.BOOKS} />;
  }

  return (
    <AppContainer>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </AppContainer>
  );
};

export { App };
