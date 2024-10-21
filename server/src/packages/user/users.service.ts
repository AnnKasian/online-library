import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';

import { UserExceptionMessage } from './libs/enums';
import {
  UserFilters,
  UserItem,
  UserSignUpDto,
  UsersGenericService,
} from './libs/types';
import { UserItemBuilder } from './user-item.builder';
import { UsersManager } from './user.manager';
import { UsersRepository } from './users.repository';

class UsersService implements UsersGenericService {
  private readonly usersManager: UsersManager<UserItem>;

  constructor(private readonly usersRepository: UsersRepository) {
    this.usersManager = new UsersManager(new UserItemBuilder());
  }

  async getByFilter(filters: UserFilters): Promise<UserItem> {
    const findedUser = await this.usersRepository.find(filters);

    if (!findedUser) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        UserExceptionMessage.USER_NOT_FOUND,
      );
    }

    return findedUser;
  }

  async getAll(ids: number[]): Promise<UserItem[]> {
    const users = await this.usersRepository.findAll(ids);

    return ids.map((id) => {
      const findedUser = users.find((user) => user.id === id);

      if (!findedUser) {
        throw new HttpException(
          HttpCode.NOT_FOUND,
          UserExceptionMessage.USER_NOT_FOUND,
        );
      }

      return findedUser;
    });
  }

  async create({
    fullName,
    email,
    dateOfBirth,
    password,
  }: UserSignUpDto): Promise<UserItem> {
    const findedUser = await this.usersRepository.find({ email });

    if (findedUser) {
      throw new HttpException(
        HttpCode.CONFLICT,
        UserExceptionMessage.USER_EXISTS,
      );
    }

    return this.usersRepository.create(
      this.usersManager.initialize({
        fullName,
        dateOfBirth,
        email,
        password,
      }),
    );
  }
}

export { UsersService };
