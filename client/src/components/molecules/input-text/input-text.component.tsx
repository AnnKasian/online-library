import { Control, FieldValues, useController } from 'react-hook-form';

import { FieldFilteredPath } from '#/libs/types';

type Properties<T extends FieldValues> = {
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
}: Properties<T>): JSX.Element => {
  const {
    field: { onChange, value, ...fieldData },
    fieldState: { error },
  } = useController({ control, name });
  const message = error?.message;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <label>
      {label}
      <input
        placeholder={placeholder}
        type={type}
        required={required}
        value={value ?? ''}
        onChange={handleChange}
        {...fieldData}
      />
      {!hideDetails && message}
      {/* TODO: Show error */}
    </label>
  );
};

export { InputText, type Properties as InputTextProps };
