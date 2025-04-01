import { Link } from 'react-router-dom';

import { UserSignInDto, userSignInDtoSchema } from '@/packages/user';

import { useSignIn } from '#/api/users';
import { Route } from '#/libs/enums';
import { useAppForm } from '#/libs/hooks';

import { ErrorMessage } from '../atoms';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '../ui';

const SignIn = (): JSX.Element => {
  const mutation = useSignIn();
  const form = useAppForm<UserSignInDto>({
    schema: userSignInDtoSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: UserSignInDto) => {
    mutation.mutate(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  return (
    <div className={'h-screen flex justify-center items-center'}>
      <Card size="form">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form className={'flex flex-col gap-2'} onSubmit={handleSubmit}>
            <div>
              Email
              <Input
                id="email"
                type="email"
                {...form.control.register('email')}
                required
              />
              {form.errors.email && (
                <ErrorMessage message={form.errors.email.message} />
              )}
            </div>
            <div>
              Password
              <Input
                type="password"
                id="password"
                {...form.control.register('password')}
                required
              />
              {form.errors.password && (
                <ErrorMessage message={form.errors.password.message} />
              )}
            </div>
            <Button
              variant={'default'}
              type="submit"
              disabled={!form.isDirty || !form.isValid}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          Don&apos;t have an account?
          <Button asChild variant={'link'}>
            <Link to={Route.SIGN_UP}> Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export { SignIn };
