import { UserRole } from './libs/enums';
import { UserBuilder, UserItem } from './libs/types';

class UserItemBuilder implements UserBuilder<UserItem> {
  private user!: UserItem;

  constructor() {
    this.reset();
  }

  reset() {
    this.user = {
      id: 0,
      fullName: '',
      dateOfBirth: new Date(),
      email: '',
      password: '',
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getResult(): UserItem {
    return this.user;
  }

  addInfo({
    fullName,
    dateOfBirth,
    email,
    password,
  }: {
    fullName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
  }): void {
    this.user = {
      ...this.user,
      fullName,
      dateOfBirth,
      email,
      password,
    };
  }

  addExtra({
    id,
    role,
    createdAt,
    updatedAt,
  }: {
    id: number;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }): void {
    this.user = {
      ...this.user,
      id,
      role,
      createdAt,
      updatedAt,
    };
  }
}

export { UserItemBuilder };
