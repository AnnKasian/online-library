import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';
import { ConfigService } from '#/services/config';
import { EncryptService } from '#/services/encrypt';

import { UserExceptionMessage } from './libs/enums';
import { UserFilters, UserItem, UserUpdateDto } from './libs/types';
import { UsersService } from './users.service';

class AuthProxy {
  constructor(private readonly usersService: UsersService) {}

  async getByFilter({ password, ...filters }: UserFilters): Promise<UserItem> {
    if (!password) {
      return this.usersService.getByFilter(filters);
    }

    const foundUser = await this.usersService.getByFilter(filters);

    const isSamePassword = await EncryptService.compare(
      password,
      foundUser.password,
    );

    if (!isSamePassword) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        UserExceptionMessage.USER_NOT_FOUND,
      );
    }

    return foundUser;
  }

  async getAll(ids: number[]): Promise<UserItem[]> {
    return this.usersService.getAll(ids);
  }

  async update(data: UserUpdateDto): Promise<UserItem> {
    const { oldPassword, email, newPassword, fullName, oldEmail } = data;

    const foundUser = await this.getByFilter({
      email: oldEmail,
      ...(oldPassword ? { password: oldPassword } : {}),
    });

    let hash: string | undefined;
    if (newPassword && oldPassword) {
      const rounds = ConfigService.instance.schema.encrypt.rounds;
      const salt = await EncryptService.generateSalt(rounds);
      hash = await EncryptService.generateHash(newPassword, salt);
    }

    return this.usersService.update(foundUser.id, {
      ...(hash ? { newPassword: hash } : {}),
      email: email ?? oldEmail,
      fullName,
    });
  }

  async create({
    password,
    ...data
  }: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: Date | null;
  }): Promise<UserItem> {
    const rounds = ConfigService.instance.schema.encrypt.rounds;
    const salt = await EncryptService.generateSalt(rounds);
    const hash = await EncryptService.generateHash(password, salt);

    return this.usersService.create({ password: hash, ...data });
  }
}

export { AuthProxy };
