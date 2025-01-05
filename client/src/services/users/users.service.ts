import { AxiosInstance } from 'axios';

import { ApiRoute } from '#/libs/enums';

import { UserApiRoute } from './libs/enums';
import { UserDto, UserSignInDto, UserSignUpDto } from './libs/types';

class UsersService {
  private readonly baseUrl: ApiRoute;
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.baseUrl = ApiRoute.USERS;
  }

  async authenticate(): Promise<UserDto> {
    const { data } = await this.client.get<UserDto>(
      `${this.baseUrl}${UserApiRoute.AUTHENTICATE}`,
    );

    return data;
  }

  async signIn(payload: UserSignInDto): Promise<UserDto> {
    const { data } = await this.client.post<UserDto>(
      `${this.baseUrl}${UserApiRoute.SIGN_IN}`,
      payload,
      {
        context: {
          avoidAuth: true,
        },
      },
    );

    return data;
  }

  async signUp(payload: UserSignUpDto): Promise<UserDto> {
    const { data } = await this.client.post<UserDto>(
      `${this.baseUrl}${UserApiRoute.SIGN_UP}`,
      payload,
      {
        context: {
          avoidAuth: true,
        },
      },
    );
    return data;
  }
}

export { UsersService };
