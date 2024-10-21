import { Box, css, styled } from '@mui/material';

import { Button } from '#/components/atoms';

const ActionsContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing(2)};
    width: 100%;
  `,
);

type FormActionsProps = {
  onDiscard: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const FormActions = ({
  onDiscard,
  loading = false,
  disabled = false,
}: FormActionsProps): JSX.Element => {
  return (
    <ActionsContainer>
      <Button onClick={onDiscard} loading={loading}>
        Discard
      </Button>
      <Button type="submit" loading={loading} disabled={disabled}>
        Submit
      </Button>
    </ActionsContainer>
  );
};

export { FormActions, type FormActionsProps };
