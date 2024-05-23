import { Box, CircularProgress } from '@mui/material';

const Loader = (): JSX.Element => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

export { Loader };
