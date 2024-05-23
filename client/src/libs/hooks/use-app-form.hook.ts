import { zodResolver } from '@hookform/resolvers/zod';
import {
  Control,
  DefaultValues,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
  ValidationMode,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

const useAppForm = <T extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  mode = 'onSubmit',
}: {
  schema: z.Schema<T>;
  defaultValues: DefaultValues<T>;
  mode?: keyof ValidationMode;
}): {
  handleSubmit: UseFormHandleSubmit<T>;
  watch: UseFormWatch<T>;
  reset: UseFormReset<T>;
  resetField: UseFormResetField<T>;
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  isValid: boolean;
  isDirty: boolean;
} => {
  const {
    handleSubmit: handleFormSubmit,
    watch,
    reset,
    resetField,
    setValue,
    getValues,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<T>({
    defaultValues,
    mode,
    resolver: zodResolver(schema),
  });

  const handleSubmit: UseFormHandleSubmit<T> = (submitHandler) => {
    return (event) => {
      event?.preventDefault();

      return handleFormSubmit(submitHandler)(event);
    };
  };

  return {
    handleSubmit,
    watch,
    reset,
    resetField,
    setValue,
    getValues,
    control,
    errors,
    isValid,
    isDirty,
  };
};

export { useAppForm };
