import { css, styled } from '@mui/material';

import { Button } from '#/components/atoms';
import { InputText } from '#/components/molecules';
import { useAppForm } from '#/libs/hooks';
import { UserSignUpDto, userSignInDtoSchema } from '#/services/users';

const FormContainer = styled('form')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

type Properties = {
  onSubmit: (payload: UserSignUpDto) => void;
  loading?: boolean;
};

const UserCreateForm = ({
  onSubmit,
  loading = false,
}: Properties): JSX.Element => {
  const { handleSubmit, errors, control, isDirty } = useAppForm({
    schema: userSignInDtoSchema,
    defaultValues: {
      name: '',
    },
  });

  return (
    <FormContainer onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <InputText
        control={control}
        errors={errors}
        name="name"
        label="Name"
        placeholder="Enter name"
        required
      />
      <Button type="submit" disabled={!isDirty || loading} fullWidth>
        Create
      </Button>
    </FormContainer>
  );
};

export { UserCreateForm, type Properties as UserCreateFormProps };
