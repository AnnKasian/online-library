import { Box, Typography, css, styled } from '@mui/material';

const PropertyContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(0.5)};
    padding: ${theme.spacing(0.5)};
  `,
);

type PropertyProps = {
  children: React.ReactNode;
  label: string;
  error?: boolean;
};

const Property = ({ children, label, error }: PropertyProps): JSX.Element => {
  return (
    <PropertyContainer>
      <Typography
        variant="h6"
        textAlign={'left'}
        color={error ? 'error' : 'black'}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        textAlign={'left'}
        color={error ? 'error' : 'black'}
      >
        {children}
      </Typography>
    </PropertyContainer>
  );
};

export { Property, type PropertyProps };
