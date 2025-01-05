import { useBooks } from '#/api/books';

import { PageTemplate } from '../templates';

const Books = (): JSX.Element => {
  const { data, isLoading, isError, error } = useBooks();

  if (isError) {
    console.error(error);
    return <div>Error fetching books</div>;
  }

  if (!data?.books) {
    return <div>No books available</div>;
  }

  return (
    <PageTemplate isLoading={isLoading}>
      <div>
        {data.books.map((book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </PageTemplate>
  );
};
export { Books };
