import { css, styled } from '@mui/material';
import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';

import { BookCreateDto, BookUpdateDto } from '@/packages/books';

import { InputText } from '#/components/molecules';
import { useAppForm } from '#/libs/hooks';

import { FormActions } from '../molecules';

const FormContainer = styled('form')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

type BookFormProps<Type extends BookCreateDto | BookUpdateDto> = {
  onSubmit: (payload: Type) => void;
  onDiscard: () => void;
  schema: z.ZodSchema<Type>;
  defaultValues?: DefaultValues<Type>;
  loading?: boolean;
};

const BookForm = <Type extends BookCreateDto | BookUpdateDto>({
  onSubmit,
  onDiscard,
  schema,
  defaultValues,
  loading = false,
}: BookFormProps<Type>): JSX.Element => {
  const { handleSubmit, control, isDirty } = useAppForm<
    BookCreateDto | BookUpdateDto
  >({
    schema: schema,
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      ...defaultValues,
    },
  });

  return (
    <FormContainer
      onSubmit={(event) =>
        void handleSubmit((payload) => {
          onSubmit(payload as Type);
        })(event)
      }
    >
      <InputText
        control={control}
        name="title"
        label="Title"
        placeholder="Enter title"
        required
      />
      <InputText
        control={control}
        name="description"
        label="Description"
        placeholder="Enter description"
        required
      />
      <InputText
        control={control}
        name="author"
        label="Author"
        placeholder="Enter author"
        required
      />
      <InputText
        control={control}
        name="genre"
        label="Genre"
        placeholder="Enter genre"
        required
      />
      <FormActions
        onDiscard={onDiscard}
        loading={loading}
        disabled={!isDirty}
      />
    </FormContainer>
  );
};

export { BookForm, type BookFormProps };
