import { Link } from 'react-router-dom';

import { BookUpdateDto, bookUpdateDtoSchema } from '@/packages/books';
import { CopyCreateDto, copyCreateDtoSchema } from '@/packages/copies';

import { useBook, useUpdateBook } from '#/api/books';
import { useCopy, useCreateCopy } from '#/api/copies';
import { Route } from '#/libs/enums';
import { getEndpoint } from '#/libs/helpers';
import { useAppForm } from '#/libs/hooks';

import { ErrorMessage } from '../atoms';
import { PageTemplate } from '../templates';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui';

const BookUpdate = (): JSX.Element => {
  const { data, isLoading, isError, error } = useBook();
  const copies = useCopy();
  const bookMutation = useUpdateBook();
  const copyMutation = useCreateCopy();

  type UpdateDto = BookUpdateDto & CopyCreateDto;
  const updateSchema = bookUpdateDtoSchema.merge(copyCreateDtoSchema);

  const form = useAppForm<UpdateDto>({
    schema: updateSchema,
    defaultValues: {
      title: data?.title,
      author: data?.author,
      genre: data?.genre,
      description: data?.description,
      amount: copies.data?.copies.length,
      bookId: data?.id,
    },
  });

  if (isError) {
    console.error(error);
    return <div>Error fetching book</div>;
  }

  const onSubmit = (data: UpdateDto) => {
    bookMutation.mutate({
      title: data.title,
      author: data.author,
      genre: data.genre,
      description: data.description,
    });
    copyMutation.mutate({ bookId: data.bookId, amount: data.amount });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  return (
    <PageTemplate isLoading={isLoading} isForm>
      {data && (
        <div className={'flex justify-center items-center m-20'}>
          <Card size="form">
            <CardHeader>
              <CardTitle>Update Book</CardTitle>
            </CardHeader>
            <CardContent>
              <form className={'flex flex-col gap-2'} onSubmit={handleSubmit}>
                <div>
                  Title
                  <Input
                    id="title"
                    type="text"
                    {...form.control.register('title')}
                    required
                  />
                  {form.errors.title && (
                    <ErrorMessage message={form.errors.title.message} />
                  )}
                </div>
                <div>
                  Genre
                  <Input
                    id="genre"
                    type="text"
                    {...form.control.register('genre')}
                    required
                  />
                  {form.errors.genre && (
                    <ErrorMessage message={form.errors.genre.message} />
                  )}
                </div>
                <div>
                  Author
                  <Input
                    id="author"
                    type="text"
                    {...form.control.register('author')}
                    required
                  />
                  {form.errors.author && (
                    <ErrorMessage message={form.errors.author.message} />
                  )}
                </div>
                <div>
                  Description
                  <Input
                    id="description"
                    type="text"
                    {...form.control.register('description')}
                    required
                  />
                  {form.errors.description && (
                    <ErrorMessage message={form.errors.description.message} />
                  )}
                </div>
                <div>
                  Add copies
                  <Input
                    id="amount"
                    type="text"
                    {...form.control.register('amount', {
                      valueAsNumber: true,
                    })}
                  />
                  {form.errors.amount && (
                    <ErrorMessage message={form.errors.amount.message} />
                  )}
                </div>
                <div className={'flex justify-between'}>
                  <Button
                    variant={'default'}
                    type="submit"
                    disabled={!form.isDirty || !form.isValid}
                  >
                    Submit
                  </Button>
                  <Button variant={'default'} type="button">
                    <Link
                      to={
                        data.id
                          ? getEndpoint(Route.BOOK_$ID, { id: data.id })
                          : '#'
                      }
                    >
                      Discard
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </PageTemplate>
  );
};
export { BookUpdate };
