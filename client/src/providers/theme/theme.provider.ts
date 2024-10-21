import { createTheme } from '@mui/material';

const createAppTheme = () => {
  return createTheme({
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: 'black',
        },
        styleOverrides: {
          root: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textTransform: 'none',
          },
        },
      },
    },
  });
};

export { createAppTheme };
