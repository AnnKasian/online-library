import { UserRole } from '#/packages/user/libs/enums';

type UserDto = {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type { UserDto };
