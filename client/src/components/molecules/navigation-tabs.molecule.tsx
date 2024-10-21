import { Box, css, styled } from '@mui/material';

import { NavigationOption } from '#/libs/types';

import { Button } from '../atoms';

const TabsContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing(4)};
  `,
);

type NavigationTabsProps = {
  options: NavigationOption[];
};

const NavigationTabs = ({ options }: NavigationTabsProps): JSX.Element => {
  return (
    <TabsContainer>
      {options.map(({ key, label, route }) => (
        <Button key={key} to={route} variant="text">
          {label}
        </Button>
      ))}
    </TabsContainer>
  );
};

export { NavigationTabs, type NavigationTabsProps };
