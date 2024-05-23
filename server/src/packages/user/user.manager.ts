import { UserBuilder, UserRaw } from './libs/types';

class UsersManager<Type> {
  constructor(private builder: UserBuilder<Type>) {}

  initialize(user: {
    fullName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
  }): Type {
    this.builder.addInfo(user);

    return this.builder.getResult();
  }

  initializeRaw({
    id,
    fullName,
    dateOfBirth,
    email,
    password,
    role,
    createdAt,
    updatedAt,
  }: UserRaw): Type {
    this.builder.addInfo({
      fullName,
      dateOfBirth,
      email,
      password,
    });
    this.builder.addExtra({
      id,
      role,
      createdAt,
      updatedAt,
    });

    return this.builder.getResult();
  }
}

export { UsersManager };
