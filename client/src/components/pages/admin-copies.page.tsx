import { useCopies } from '#/api/copies';

import { PageTemplate } from '../templates';
import {
  Card, // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';

const AdminCopies = (): JSX.Element => {
  const { data, isLoading, isError, error } = useCopies();

  if (isError) {
    console.error(error);
    return <div>Error fetching copies</div>;
  }

  //   const handleClick = (bookId: number) => {
  //     return () => {
  //       navigate(getEndpoint(Route.BOOK_$ID, { id: bookId }));
  //     };
  //   };

  //   const handleCreateClick = () => {
  //     navigate(Route.BOOKS_CREATE);
  //   };
  //onClick={handleClick(book.id)}

  return (
    <PageTemplate isLoading={isLoading}>
      {data ? (
        data.copies.map((copy) => (
          <Card key={copy.id}>
            <CardHeader>
              <CardTitle>{copy.book.title}</CardTitle>
              <CardDescription>
                {'User name: ' + copy.user?.fullName}
              </CardDescription>
              <CardDescription>
                {'User email: ' + copy.user?.email}
              </CardDescription>
            </CardHeader>
            {/* <CardContent>{copy.returnedAt.toISOString()}</CardContent> */}
          </Card>
        ))
      ) : (
        <div>No copies available</div>
      )}
    </PageTemplate>
  );
};
export { AdminCopies };
