import { Box, css, styled } from '@mui/material';

import { Modal } from '#/components/molecules';

import { Button } from '../atoms';

const ActionsContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing(2)};
    width: 100%;
  `,
);
type ConfirmModalProps = {
  title: string;
  opened: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDiscard?: () => void;
};

const ConfirmModal = ({
  title,
  opened,
  loading,
  onClose,
  onSubmit,
  onDiscard,
}: ConfirmModalProps): JSX.Element => {
  return (
    <Modal onClose={onClose} opened={opened} title={title}>
      <ActionsContainer>
        <Button onClick={onDiscard ?? onClose} loading={loading}>
          Discard
        </Button>
        <Button onClick={onSubmit} loading={loading}>
          Submit
        </Button>
      </ActionsContainer>
    </Modal>
  );
};

export { ConfirmModal, type ConfirmModalProps };
