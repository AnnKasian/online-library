import { Router } from 'express';

import { HttpCode } from '#/libs/enums';
import { handleAsync, validateSchemas } from '#/libs/middlewares';

import { UserApiRoute } from './libs/enums';
import { userSignInDtoSchema, userSignUpDtoSchema } from './libs/schemas';
import {
  UserDto,
  UserSignInDto,
  UserSignUpDto,
  UsersGenericService,
} from './libs/types';

class UsersController {
  constructor(
    private readonly usersRouter: Router,
    private readonly usersService: UsersGenericService,
  ) {}

  useRoutes() {
    this.authenticate();
    this.signIn();
    this.signUp();
  }

  authenticate(): void {
    this.usersRouter.get<string, {}, UserDto>(
      UserApiRoute.AUTHENTICATE,
      (request, response) => {
        const user = request.user;

        response.status(HttpCode.OK).json(user);
      },
    );
  }

  signIn(): void {
    this.usersRouter.post<string, {}, UserDto, UserSignInDto>(
      UserApiRoute.SIGN_IN,
      validateSchemas({
        body: userSignInDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const payload = request.body;
        const { password, ...user } =
          await this.usersService.getByFilter(payload);

        response.status(HttpCode.OK).json(user);
      }),
    );
  }

  signUp(): void {
    this.usersRouter.post<string, {}, UserDto, UserSignUpDto>(
      UserApiRoute.SIGN_UP,
      validateSchemas({
        body: userSignUpDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const payload = request.body;
        const { password, ...user } = await this.usersService.create(payload);

        response.status(HttpCode.CREATED).json(user);
      }),
    );
  }
}

export { UsersController };
