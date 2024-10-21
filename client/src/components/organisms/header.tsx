import { Box, Divider, css, styled } from '@mui/material';

import { Route } from '#/libs/enums';
import { useAppSelector } from '#/libs/hooks';
import { NavigationOption } from '#/libs/types';
import { UserRole } from '#/services/users';

import { Title } from '../atoms';
import { NavigationTabs, UserLinks } from '../molecules';

const HeaderSpace = styled('header')`
  width: 100%;
  height: 60px;
`;

const HeaderContainer = styled(HeaderSpace)(
  ({ theme }) => css`
    position: fixed;
    z-index: ${theme.zIndex.appBar};
    background-color: ${theme.palette.common.white};
  `,
);

const HeaderContent = styled(Box)(
  ({ theme }) => css`
    width: 100%;
    padding: 0 ${theme.spacing(2)} 0 ${theme.spacing(1)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  `,
);

const Header = (): JSX.Element => {
  const user = useAppSelector(({ users }) => users.user);
  const isAdmin = user?.role === UserRole.ADMIN;

  const options: NavigationOption[] = [
    {
      key: 1,
      label: 'BOOKS',
      route: Route.BOOKS,
    },
    {
      key: 2,
      label: 'MY COPIES',
      route: Route.MY_COPIES,
    },
  ];

  if (isAdmin) {
    options.push({
      key: 3,
      label: 'COPIES',
      route: Route.COPIES,
    });
  }

  return (
    <>
      <HeaderSpace />
      <HeaderContainer>
        <HeaderContent>
          <Title />
          {user && (
            <>
              <NavigationTabs options={options} />
              <UserLinks user={user} />
            </>
          )}
        </HeaderContent>
        <Divider />
      </HeaderContainer>
    </>
  );
};

export { Header };
