import { css, styled } from '@mui/material';

import { Button } from '#/components/atoms';
import { InputDate, InputText } from '#/components/molecules';
import { useAppForm } from '#/libs/hooks';
import { UserSignUpDto, userSignUpDtoSchema } from '#/services/users';

const FormContainer = styled('form')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

type UserSignUpFormProps = {
  onSubmit: (payload: UserSignUpDto) => void;
  loading?: boolean;
};

const UserSignUpForm = ({
  onSubmit,
  loading = false,
}: UserSignUpFormProps): JSX.Element => {
  const { handleSubmit, control, isDirty } = useAppForm({
    schema: userSignUpDtoSchema,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      dateOfBirth: undefined,
    },
  });

  return (
    <FormContainer onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <InputText
        control={control}
        name="fullName"
        label="Full name"
        placeholder="Enter full name"
        required
      />
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
      <InputDate
        control={control}
        name="dateOfBirth"
        label="Date of birth"
        placeholder="Choose date"
        limits={{
          max: new Date(),
        }}
        required
      />
      <Button type="submit" loading={loading} disabled={!isDirty}>
        Submit
      </Button>
    </FormContainer>
  );
};

export { UserSignUpForm, type UserSignUpFormProps };
