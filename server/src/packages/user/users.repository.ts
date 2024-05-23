import { Prisma } from '@prisma/client';

import { ItemRepository } from '#/libs/types';
import { PrismaService } from '#/services/prisma';

import { UserFilters, UserItem } from './libs/types';
import { UserItemBuilder } from './user-item.builder';
import { UsersManager } from './user.manager';

class UsersRepository extends ItemRepository<UserItem> {
  private readonly usersManager: UsersManager<UserItem>;
  private readonly users: Prisma.UserDelegate;

  constructor() {
    super();
    this.users = PrismaService.instance.user;
    this.usersManager = new UsersManager(new UserItemBuilder());
  }

  async find({ id, email, password }: UserFilters): Promise<UserItem | null> {
    const user = await this.users.findFirst({
      where: {
        id,
        email,
        password,
      },
    });

    return user ? this.usersManager.initializeRaw(user) : null;
  }

  async findAll(ids: number[]): Promise<UserItem[]> {
    const users = await this.users.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return users.map((user) => this.usersManager.initializeRaw(user));
  }

  async create({
    fullName,
    dateOfBirth,
    email,
    password,
  }: UserItem): Promise<UserItem> {
    const user = await this.users.create({
      data: {
        fullName,
        dateOfBirth,
        email,
        password,
      },
    });

    return this.usersManager.initializeRaw(user);
  }

  createAll(): Promise<number> {
    return Promise.resolve(0);
  }

  update(): Promise<UserItem> {
    return Promise.resolve({} as UserItem);
  }

  delete(): Promise<UserItem> {
    return Promise.resolve({} as UserItem);
  }
}

export { UsersRepository };
