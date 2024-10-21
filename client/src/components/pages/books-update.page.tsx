import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getEndpoint } from '@/libs/helpers';
import { BookUpdateDto, bookCreateDtoSchema } from '@/packages/books';

import { PaperTemplate } from '#/components/templates';
import { DataStatus, Route } from '#/libs/enums';
import { useAppDispatch, useAppSelector } from '#/libs/hooks';
import { booksActions } from '#/slices/books';

import { Loader } from '../atoms';
import { BookForm } from '../organisms';

const BooksUpdate = (): JSX.Element => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { book, getDataStatus, updateDataStatus } = useAppSelector(
    ({ books }) => ({
      book: books.book,
      getDataStatus: books.dataStatus.get,
      updateDataStatus: books.dataStatus.update,
    }),
  );

  const handleSubmit = (payload: BookUpdateDto) => {
    void dispatch(booksActions.update({ id: Number(id), ...payload }))
      .unwrap()
      .then(({ id }) => {
        navigate(getEndpoint(Route.BOOK_$ID, { id }));
      });
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  useEffect(() => {
    void dispatch(booksActions.get(Number(id)));
  }, [dispatch, id]);

  if (!book || getDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <PaperTemplate title="Update book">
      <BookForm
        onSubmit={handleSubmit}
        onDiscard={handleDiscard}
        schema={bookCreateDtoSchema}
        defaultValues={{
          title: book.title,
          description: book.description,
          author: book.author,
          genre: book.genre,
        }}
        loading={updateDataStatus === DataStatus.PENDING}
      />
    </PaperTemplate>
  );
};

export { BooksUpdate };
