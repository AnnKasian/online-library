import { UserSignInDto } from '@/packages/user';

const userQueryKeys = {
  all: ['users'],
  detail: ({ email, password }: UserSignInDto) => [
    ...userQueryKeys.all,
    { email, password },
  ],
};

export { userQueryKeys };
