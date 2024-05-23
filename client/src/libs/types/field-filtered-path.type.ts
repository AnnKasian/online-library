import { FieldPath, FieldValues } from 'react-hook-form';

type FieldFilteredPath<
  FormValues extends FieldValues,
  Filter = unknown,
> = FieldPath<FormValues> &
  {
    [Key in keyof FormValues]: FormValues[Key] extends Filter ? Key : never;
  }[keyof FormValues];

export type { FieldFilteredPath };
