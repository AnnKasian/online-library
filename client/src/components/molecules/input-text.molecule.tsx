import { TextField } from '@mui/material';
import { Control, FieldValues, useController } from 'react-hook-form';

import { FieldFilteredPath } from '#/libs/types';

type InputTextProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldFilteredPath<T, string | undefined>;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  hideDetails?: boolean;
};

const InputText = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  hideDetails = false,
}: InputTextProps<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldData },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={type}
      required={required}
      error={Boolean(error)}
      helperText={error?.message?.toString() ?? (!hideDetails && ' ')}
      value={value ?? ''}
      onChange={handleChange}
      fullWidth
      {...fieldData}
    />
  );
};

export { InputText, type InputTextProps };
