import { UserRole } from '../enums';

type UserBuilder<T> = {
  reset(): void;
  addInfo(fields: {
    fullName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
  }): void;
  addExtra(fields: {
    id: number;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }): void;
  getResult(): T;
};

export type { UserBuilder };
