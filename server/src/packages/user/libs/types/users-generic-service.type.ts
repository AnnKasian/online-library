import { UserSignUpDto } from '@/packages/user';

import { UserFilters } from './user-filters.type';
import { UserItem } from './user-item.type';

type UsersGenericService = {
  getByFilter(filters: UserFilters): Promise<UserItem>;
  getAll(ids: number[]): Promise<UserItem[]>;
  create(data: UserSignUpDto): Promise<UserItem>;
};

export type { UsersGenericService };
