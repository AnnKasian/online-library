import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';

import { UserExceptionMessage } from './libs/enums';
import {
  UserFilters,
  UserItem,
  UserSignUpDto,
  UserUpdateDto,
} from './libs/types';
import { UserItemBuilder } from './user-item.builder';
import { UsersManager } from './user.manager';
import { UsersRepository } from './users.repository';

class UsersService {
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

    dateOfBirth = dateOfBirth || new Date();

    return this.usersRepository.create(
      this.usersManager.initialize({
        fullName,
        dateOfBirth,
        email,
        password,
      }),
    );
  }

  async update(
    id: number,
    { fullName, email, newPassword }: Partial<UserUpdateDto>,
  ): Promise<UserItem> {
    const findedUser = await this.usersRepository.find({ id });

    if (!findedUser) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        UserExceptionMessage.USER_NOT_FOUND,
      );
    }

    return this.usersRepository.update(id, {
      fullName,
      email,
      password: newPassword,
    });
  }
}

export { UsersService };
