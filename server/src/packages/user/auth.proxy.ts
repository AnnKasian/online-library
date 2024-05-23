import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';
import { ConfigService } from '#/services/config';
import { EncryptService } from '#/services/encrypt';

import { UserExceptionMessage } from './libs/enums';
import { UserFilters, UserItem } from './libs/types';
import { UsersService } from './users.service';

class AuthProxy extends UsersService {
  async getByFilter({ password, ...filters }: UserFilters): Promise<UserItem> {
    if (!password) {
      return super.getByFilter(filters);
    }

    const findedUser = await super.getByFilter(filters);

    const isSamePassword = await EncryptService.compare(
      password,
      findedUser.password,
    );

    if (isSamePassword) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        UserExceptionMessage.USER_NOT_FOUND,
      );
    }

    return findedUser;
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

    return super.create({ password: hash, ...data });
  }
}

export { AuthProxy };
