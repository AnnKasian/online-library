import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { UserSignUpDto, userSignUpDtoSchema } from '@/packages/user';

import { useSignUp } from '#/api/users';
import { Route } from '#/libs/enums';
import { cn } from '#/libs/helpers';
import { useAppForm } from '#/libs/hooks';

import { ErrorMessage } from '../atoms';
import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui';

const SignUp = (): JSX.Element => {
  const mutation = useSignUp();

  const form = useAppForm<UserSignUpDto>({
    schema: userSignUpDtoSchema,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      dateOfBirth: null,
    },
  });

  const onSubmit = (data: UserSignUpDto) => {
    mutation.mutate(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void form.handleSubmit(onSubmit)(e);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card size="form">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              Full Name
              <Input
                id="fullName"
                type="text"
                {...form.control.register('fullName')}
                required
              />
              {form.errors.fullName && (
                <ErrorMessage message={form.errors.fullName.message} />
              )}
            </div>
            <div className="flex flex-col">
              Date of Birth
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !form.watch('dateOfBirth') && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch('dateOfBirth') ? (
                      format(new Date(form.watch('dateOfBirth') as Date), 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={form.watch('dateOfBirth') || undefined}
                    onSelect={(date) => {
                      if (date) {
                        form.setValue('dateOfBirth', date);
                      }
                    }}
                    fromYear={1930}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
              {form.errors.dateOfBirth && (
                <ErrorMessage message={form.errors.dateOfBirth.message} />
              )}
            </div>
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
              variant="default"
              type="submit"
              disabled={!form.isDirty || !form.isValid}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          Already have an account?
          <Button asChild variant="link">
            <Link to={Route.SIGN_IN}> Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export { SignUp };
