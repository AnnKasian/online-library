import { Outlet } from 'react-router';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export { App };
