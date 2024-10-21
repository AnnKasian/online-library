import { css, styled } from '@mui/material';

import { Button } from '#/components/atoms';
import { InputText } from '#/components/molecules';
import { useAppForm } from '#/libs/hooks';
import { UserSignInDto, userSignInDtoSchema } from '#/services/users';

const FormContainer = styled('form')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

type UserSignInFormProps = {
  onSubmit: (payload: UserSignInDto) => void;
  loading?: boolean;
};

const UserSignInForm = ({
  onSubmit,
  loading = false,
}: UserSignInFormProps): JSX.Element => {
  const { handleSubmit, control, isDirty } = useAppForm({
    schema: userSignInDtoSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <FormContainer onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <InputText
        control={control}
        name="email"
        type="email"
        label="Email"
        placeholder="Enter email"
        required
      />
      <InputText
        control={control}
        name="password"
        type="password"
        label="Password"
        placeholder="Enter password"
        required
      />
      <Button type="submit" loading={loading} disabled={!isDirty}>
        Submit
      </Button>
    </FormContainer>
  );
};

export { UserSignInForm, type UserSignInFormProps };
