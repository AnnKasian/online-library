import { useNavigate } from 'react-router';

import { getEndpoint } from '@/libs/helpers';
import { BookCreateDto, bookCreateDtoSchema } from '@/packages/books';

import { PaperTemplate } from '#/components/templates';
import { DataStatus, Route } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { booksActions } from '#/slices/books';

import { BookForm } from '../organisms';

const BooksCreate = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ books }) => ({
    dataStatus: books.dataStatus.create,
  }));

  const handleSubmit = (payload: BookCreateDto) => {
    void dispatch(booksActions.create(payload))
      .unwrap()
      .then(({ id }) => {
        navigate(getEndpoint(Route.BOOK_$ID, { id }));
      });
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <PaperTemplate title="Create book">
      <BookForm
        onSubmit={handleSubmit}
        onDiscard={handleDiscard}
        schema={bookCreateDtoSchema}
        loading={dataStatus === DataStatus.PENDING}
      />
    </PaperTemplate>
  );
};

export { BooksCreate };
