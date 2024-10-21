import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';
import { ConfigService } from '#/services/config';
import { EncryptService } from '#/services/encrypt';

import { UserExceptionMessage } from './libs/enums';
import { UserFilters, UserItem, UsersGenericService } from './libs/types';

class AuthProxy implements UsersGenericService {
  constructor(private readonly usersService: UsersGenericService) {}

  async getByFilter({ password, ...filters }: UserFilters): Promise<UserItem> {
    if (!password) {
      return this.usersService.getByFilter(filters);
    }

    const findedUser = await this.usersService.getByFilter(filters);

    const isSamePassword = await EncryptService.compare(
      password,
      findedUser.password,
    );

    if (!isSamePassword) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        UserExceptionMessage.USER_NOT_FOUND,
      );
    }

    return findedUser;
  }

  async getAll(ids: number[]): Promise<UserItem[]> {
    return this.usersService.getAll(ids);
  }

  async create({
    password,
    ...data
  }: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date;
  }): Promise<UserItem> {
    const rounds = ConfigService.instance.schema.encrypt.rounds;
    const salt = await EncryptService.generateSalt(rounds);
    const hash = await EncryptService.generateHash(password, salt);

    return this.usersService.create({ password: hash, ...data });
  }
}

export { AuthProxy };
