import { Box, Typography, useTheme } from '@mui/material';

import { Route } from '#/libs/enums';

import { Button } from './button.atom';

const Title = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Button variant="text" to={Route.BOOKS}>
      <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
        <img src="/favicon.png" alt="Library." width={40} height={40} />
        <Typography variant="h5" color={'black'}>
          Library
        </Typography>
      </Box>
    </Button>
  );
};

export { Title };
