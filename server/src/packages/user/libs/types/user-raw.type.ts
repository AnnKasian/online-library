import { UserRole } from '@/packages/user';

type UserRaw = {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type { UserRaw };
