import { AxiosInstance } from 'axios';

import { getEndpoint } from '@/libs/helpers';

import { ApiRoute } from '#/libs/enums';

import { UserApiRoute } from './libs/enums';
import {
  UserDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateDto,
} from './libs/types';

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

  async update(id: number, payload: UserUpdateDto): Promise<UserDto> {
    const { data } = await this.client.put<UserDto>(
      getEndpoint(`${this.baseUrl}${UserApiRoute.UPDATE}`, {
        id,
      }),
      payload,
    );

    return data;
  }
}

export { UsersService };
