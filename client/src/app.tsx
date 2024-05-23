import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router';

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = (): JSX.Element => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
};

export { App };
