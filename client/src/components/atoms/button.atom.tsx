import {
  Box,
  Button as LibraryButton,
  ButtonProps as LibraryButtonProps,
  css,
  styled,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Route } from '#/libs/enums';

import { Loader } from './loader.atom';

const VariantButton = styled(
  ({ raw, ...props }: LibraryButtonProps & { raw: boolean }) => (
    <LibraryButton {...props} />
  ),
)(
  ({ raw }) => css`
    text-transform: none;
    ${raw &&
    css`
      padding: 0;
    `}
  `,
);

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  to?: Route | String;
  type?: 'submit' | 'button';
  variant?: LibraryButtonProps['variant'] | 'action';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  to,
  type = 'button',
  variant = 'contained',
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
}: ButtonProps) => {
  const theme = useTheme();

  const getLinkWrapper = (children: React.ReactNode): JSX.Element => {
    if (to) {
      return (
        <Link className={className} to={to.toString()}>
          {children}
        </Link>
      );
    }

    return <>{children}</>;
  };

  return getLinkWrapper(
    <VariantButton
      onClick={onClick}
      type={type}
      variant={variant === 'action' ? 'text' : variant}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      raw={variant === 'action'}
      className={className}
    >
      <Box display="flex" flex={1} height="100%" gap={theme.spacing(2)}>
        {loading && <Loader size={20} inline />} {children}
      </Box>
    </VariantButton>,
  );
};

export { Button, type ButtonProps };
