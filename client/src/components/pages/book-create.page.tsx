import { Link } from 'react-router-dom';

import { BookCreateDto, bookCreateDtoSchema } from '@/packages/books';

import { useCreateBook } from '#/api/books';
import { Route } from '#/libs/enums';
import { useAppForm } from '#/libs/hooks';

import { ErrorMessage } from '../atoms';
import { PageTemplate } from '../templates';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '../ui';

const BookCreate = (): JSX.Element => {
  const mutation = useCreateBook();

  const form = useAppForm<BookCreateDto>({
    schema: bookCreateDtoSchema,
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      description: '',
    },
  });

  const onSubmit = (data: BookCreateDto) => {
    mutation.mutate(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  return (
    <PageTemplate isForm>
      <div className={'flex justify-center items-center m-20'}>
        <Card size="form">
          <CardHeader>
            <CardTitle>Create Book</CardTitle>
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
              <div className={'flex justify-between'}>
                <Button
                  variant={'default'}
                  type="submit"
                  disabled={!form.isDirty || !form.isValid}
                >
                  Submit
                </Button>
                <Button variant={'default'} type="button">
                  <Link to={Route.BOOKS}>Discard</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};
export { BookCreate };
