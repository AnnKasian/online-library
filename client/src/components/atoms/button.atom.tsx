import { ButtonProps, Button as LibraryButton } from '@mui/material';

type Properties = {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  children,
  type = 'button',
  variant = 'contained',
  disabled = false,
  fullWidth = false,
}: Properties) => {
  return (
    <LibraryButton
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </LibraryButton>
  );
};

export { Button };
