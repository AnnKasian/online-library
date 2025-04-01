import { useNavigate } from 'react-router-dom';

import { useBook } from '#/api/books';
import { useCopy, useReserveCopy } from '#/api/copies';
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
} from '../ui';

const Book = (): JSX.Element => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useBook();
  const copies = useCopy();
  const mutation = useReserveCopy();

  const isCopyAwailable = copies.data ? copies.data.copies.length > 0 : false;

  if (isError) {
    console.error(error);
    return <div>Error fetching book</div>;
  }

  const handleReserveClick = (bookId: number) => {
    return () => {
      mutation.mutate({ bookId });
    };
  };

  const handleEditClick = (bookId: number) => {
    return () => {
      navigate(getEndpoint(Route.BOOKS_UPDATE_$ID, { id: bookId }));
    };
  };

  return (
    <PageTemplate isLoading={isLoading && copies.isLoading} isBookPage>
      {data && (
        <Card className={'self-center min-w-60'} key={data.id}>
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.genre}</CardDescription>
          </CardHeader>
          <CardContent>Author: {data.author}</CardContent>
          <CardContent>Description: {data.description}</CardContent>
          <CardContent>
            Copies available: {copies.data?.copies.length}
          </CardContent>
          <div className={'flex gap-10 justify-center m-4'}>
            {isCopyAwailable ? (
              <Button
                variant={'default'}
                onClick={handleReserveClick(data.id)}
                type="button"
                className={'w-20'}
              >
                Reserve
              </Button>
            ) : (
              <Button
                variant={'default'}
                disabled
                onClick={handleReserveClick(data.id)}
                type="button"
                className={'w-20'}
              >
                Reserve
              </Button>
            )}
            <Button
              variant={'default'}
              onClick={handleEditClick(data.id)}
              type="button"
              className={'w-20'}
            >
              Edit
            </Button>
          </div>
        </Card>
      )}
    </PageTemplate>
  );
};
export { Book };
