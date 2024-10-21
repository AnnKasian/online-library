import { DatePicker } from '@mui/x-date-pickers';
import { Control, FieldValues, useController } from 'react-hook-form';

import { FieldFilteredPath } from '#/libs/types';

type InputDateProps<T extends FieldValues> = {
  control: Control<T>;
  errorsStable?: boolean;
  name: FieldFilteredPath<T, Date | undefined>;
  label: string;
  placeholder?: string;
  limits?: {
    max?: Date;
    min?: Date;
  };
  required?: boolean;
  hideDetails?: boolean;
};

const InputDate = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  limits = {},
  required = false,
  hideDetails = false,
}: InputDateProps<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldData },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (value: Date | null) => {
    onChange(value);
  };

  return (
    <DatePicker
      label={label}
      maxDate={limits.max}
      minDate={limits.min}
      slotProps={{
        textField: {
          placeholder,
          error: Boolean(error),
          helperText: error?.message?.toString() ?? (!hideDetails && ' '),
          fullWidth: true,
          required,
        },
      }}
      onChange={handleChange}
      value={value ?? null}
      {...fieldData}
    />
  );
};

export { InputDate, type InputDateProps };
