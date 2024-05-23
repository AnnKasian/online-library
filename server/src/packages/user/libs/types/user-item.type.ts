import { UserDto } from '@/packages/user';

type UserItem = UserDto & {
  password: string;
};

export type { UserItem };
