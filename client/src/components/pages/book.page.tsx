import { Box, css, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getEndpoint } from '@/libs/helpers';

import { PaperTemplate } from '#/components/templates';
import { DataStatus, Route } from '#/libs/enums';
import { useAdminRights, useAppDispatch, useAppSelector } from '#/libs/hooks';
import { booksActions } from '#/slices/books';
import { copiesActions } from '#/slices/copies';

import { Button, Loader } from '../atoms';
import { BookInfo, ConfirmModal, CopyCreateModal } from '../organisms';

const ActionsContainer = styled(Box)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing(2)};
    width: 100%;
    padding-top: ${theme.spacing(2)};
  `,
);

const Book = (): JSX.Element => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const isAdmin = useAdminRights();
  const dispatch = useAppDispatch();
  const { book, amount, bookDataStatus, copiesDataStatus, reserveDataStatus } =
    useAppSelector(({ books, copies }) => ({
      book: books.book,
      amount: copies.copiesBook?.amount,
      bookDataStatus: books.dataStatus.get,
      copiesDataStatus: copies.dataStatus.getByBook,
      reserveDataStatus: copies.dataStatus.reserve,
    }));

  const [reserveOpen, setReserveOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const isAvailable = amount && amount > 0;

  useEffect(() => {
    const idParsed = Number(id);
    void dispatch(booksActions.get(idParsed));
    void dispatch(copiesActions.getByBook(idParsed));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateChange = () => {
    setCreateOpen((opened) => !opened);
  };

  const handleReserveChange = () => {
    setReserveOpen((opened) => !opened);
  };

  const handleReserveSubmit = () => {
    void dispatch(copiesActions.reserve(Number(id)))
      .unwrap()
      .then(() => {
        handleReserveChange();
      });
  };

  console.log(amount, copiesDataStatus);

  if (
    !book ||
    amount === undefined ||
    bookDataStatus === DataStatus.PENDING ||
    copiesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return (
    <PaperTemplate title="Book">
      <BookInfo book={book} amount={amount} />
      <Box>
        <ActionsContainer>
          <Button onClick={handleBack}>Back</Button>
          <Button disabled={!isAvailable} onClick={handleReserveChange}>
            Reserve
          </Button>
          <ConfirmModal
            title="Are you sure you want to reserve book?"
            loading={reserveDataStatus === DataStatus.PENDING}
            opened={reserveOpen}
            onSubmit={handleReserveSubmit}
            onClose={handleReserveChange}
          />
        </ActionsContainer>
        {isAdmin && (
          <ActionsContainer>
            <Button to={getEndpoint(Route.BOOKS_UPDATE_$ID, { id: book.id })}>
              Edit
            </Button>
            <Button onClick={handleCreateChange}>Add copies</Button>
            <CopyCreateModal
              onClose={handleCreateChange}
              opened={createOpen}
              bookId={book.id}
            />
          </ActionsContainer>
        )}
      </Box>
    </PaperTemplate>
  );
};

export { Book };
