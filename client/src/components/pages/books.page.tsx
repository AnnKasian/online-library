import { useEffect } from 'react';

import { Route } from '#/libs/enums';
import { useAdminRights, useAppDispatch, useAppSelector } from '#/libs/hooks';
import { booksActions } from '#/slices/books';

import { Button, Loader } from '../atoms';
import { BookPaper } from '../molecules';
import { GridTemplate, PageTemplate } from '../templates';

const Books = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector(({ books }) => ({
    books: books.books?.books,
  }));
  const isAdmin = useAdminRights();

  useEffect(() => {
    void dispatch(booksActions.getAll());
  }, [dispatch]);

  if (!books) {
    return <Loader />;
  }

  return (
    <PageTemplate>
      <GridTemplate
        label="Books"
        size={{
          column: 200,
          row: 170,
        }}
        info={
          isAdmin ? <Button to={Route.BOOKS_CREATE}>Add</Button> : undefined
        }
      >
        {books.map((book) => (
          <BookPaper key={book.id} book={book} />
        ))}
      </GridTemplate>
    </PageTemplate>
  );
};

export { Books };
