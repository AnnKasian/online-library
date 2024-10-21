import { TextField } from '@mui/material';
import { Control, FieldValues, useController } from 'react-hook-form';

import { FieldFilteredPath } from '#/libs/types';

type InputNumberProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldFilteredPath<T, number | undefined>;
  label: string;
  placeholder?: string;
  limits?: {
    max?: number;
    min?: number;
  };
  required?: boolean;
  hideDetails?: boolean;
};

const InputNumber = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  limits = {},
  required = false,
  hideDetails = true,
}: InputNumberProps<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldData },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = Number(event.target.value);
    onChange(value);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type="number"
      required={required}
      error={Boolean(error)}
      helperText={error?.message ?? (hideDetails && ' ')}
      fullWidth
      value={value ?? ''}
      onChange={handleChange}
      InputProps={{
        inputProps: {
          min: limits.min,
          max: limits.max,
        },
      }}
      {...fieldData}
    />
  );
};

export { InputNumber, type InputNumberProps };
