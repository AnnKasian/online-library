import { css, styled } from '@mui/material';

import { copyCreateDtoSchema } from '@/packages/copies';

import { FormActions, InputNumber, Modal } from '#/components/molecules';
import { DataStatus } from '#/libs/enums';
import { useAppDispatch, useAppForm, useAppSelector } from '#/libs/hooks';
import { copiesActions } from '#/slices/copies';

const FormContainer = styled('form')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
  `,
);

type CopyCreateModalProps = {
  bookId: number;
  opened: boolean;
  onClose: () => void;
};

const CopyCreateModal = ({
  bookId,
  opened,
  onClose,
}: CopyCreateModalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ copies }) => ({
    dataStatus: copies.dataStatus.create,
  }));

  const { handleSubmit, control, isDirty } = useAppForm({
    schema: copyCreateDtoSchema,
    defaultValues: {
      amount: undefined,
      bookId,
    },
  });

  const handleFormSubmit = handleSubmit((payload) => {
    void dispatch(copiesActions.create(payload))
      .unwrap()
      .then(() => {
        onClose();
      });
  });

  return (
    <Modal onClose={onClose} opened={opened} title="Create copies">
      <FormContainer onSubmit={(event) => void handleFormSubmit(event)}>
        <InputNumber
          control={control}
          name="amount"
          label="Amount"
          placeholder="Enter amount of copies"
          limits={{
            min: 1,
          }}
          required
        />
        <FormActions
          onDiscard={onClose}
          loading={dataStatus === DataStatus.PENDING}
          disabled={!isDirty}
        />
      </FormContainer>
    </Modal>
  );
};

export { CopyCreateModal, type CopyCreateModalProps };
