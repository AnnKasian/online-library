import { TextField } from '@mui/material';
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from 'react-hook-form';

import { FieldFilteredPath } from '#/libs/types';

type Properties<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: FieldFilteredPath<T, string | undefined>;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  hideDetails?: boolean;
};

const InputText = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  hideDetails = false,
}: Properties<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldData },
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
      error={Boolean(errors[name])}
      helperText={errors[name]?.message?.toString() ?? (!hideDetails && ' ')}
      value={value ?? ''}
      onChange={handleChange}
      fullWidth
      {...fieldData}
    />
  );
};

export { InputText, type Properties as InputTextProps };
