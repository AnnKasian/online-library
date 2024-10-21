import { Box, Typography, css, styled } from '@mui/material';

import { useAppDispatch } from '#/libs/hooks';
import { UserDto } from '#/services/users';
import { usersActions } from '#/slices/users';

import { Button } from '../atoms';

const LinksContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

type UserLinksProps = {
  user: UserDto;
};

const UserLinks = ({ user }: UserLinksProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    void dispatch(usersActions.signOut());
  };

  return (
    <LinksContainer>
      <Typography variant="h6">{user.fullName}</Typography>
      <Button onClick={handleClick}>Sign out</Button>
    </LinksContainer>
  );
};

export { UserLinks, type UserLinksProps };
