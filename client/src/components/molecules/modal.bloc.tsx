import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  css,
  styled,
} from '@mui/material';

const ModalContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const TitleContainer = styled(DialogTitle)(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing(2)};
  `,
);

const ContentContainer = styled(DialogContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

type ModalProps = {
  children: React.ReactNode;
  opened: boolean;
  onClose: () => void;
  title: React.ReactNode;
  fullWidth?: boolean;
};

const Modal = ({
  opened,
  onClose,
  title,
  children,
  fullWidth,
}: ModalProps): JSX.Element => {
  return (
    <Dialog onClose={onClose} open={opened} fullWidth={fullWidth}>
      <ModalContainer
        onClick={(event: React.SyntheticEvent) => {
          event.stopPropagation();
        }}
      >
        <TitleContainer>{title}</TitleContainer>
        <ContentContainer>{children}</ContentContainer>
      </ModalContainer>
    </Dialog>
  );
};

export { Modal, type ModalProps };
