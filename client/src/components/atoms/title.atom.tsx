import { NavLink } from 'react-router-dom';

import { Route } from '#/libs/enums';

const Title = (): JSX.Element => {
  return (
    <NavLink
      className={
        'inline-flex gap-2.5 items-center justify-center no-underline transition-all duration-300 ease-in-out '
      }
      to={Route.ROOT}
    >
      <img alt="Library" height={40} src="/favicon.png" width={40} />
      <span className={'text-2xl cursor-pointer'}>Library</span>
    </NavLink>
  );
};

export { Title };
