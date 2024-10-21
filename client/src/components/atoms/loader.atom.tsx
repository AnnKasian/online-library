import { Box, CircularProgress, CircularProgressProps } from '@mui/material';

type LoaderProps = {
  color?: CircularProgressProps['color'];
  size?: number;
  inline?: boolean;
};

const Loader = ({ color, size, inline }: LoaderProps): JSX.Element => {
  return (
    <Box
      flex={inline ? undefined : 1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export { Loader, type LoaderProps };
