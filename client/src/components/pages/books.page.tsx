import { useNavigate } from 'react-router';

import { useBooks } from '#/api/books';
import { Route } from '#/libs/enums';
import { getEndpoint } from '#/libs/helpers';

import { PageTemplate } from '../templates';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui';

const Books = (): JSX.Element => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useBooks();

  if (isError) {
    console.error(error);
    return <div>Error fetching books</div>;
  }

  const handleClick = (bookId: number) => {
    return () => {
      navigate(getEndpoint(Route.BOOK_$ID, { id: bookId }));
    };
  };

  const handleCreateClick = () => {
    navigate(Route.BOOKS_CREATE);
  };

  return (
    <>
      {' '}
      <PageTemplate isLoading={isLoading}>
        {data ? (
          data.books.map((book) => (
            <Card onClick={handleClick(book.id)} key={book.id}>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>{book.genre}</CardDescription>
              </CardHeader>
              <CardContent>Author: {book.author}</CardContent>
            </Card>
          ))
        ) : (
          <div>No books available</div>
        )}
      </PageTemplate>
      <div className="fixed bottom-10 right-14 z-50">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button className="rounded-full p-3.5" onClick={handleCreateClick}>
              +
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Add a new book</HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};
export { Books };
