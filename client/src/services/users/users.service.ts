import { AxiosInstance } from 'axios';

import { ApiRoute, ApiRouteValue } from '#/libs/enums';

import { UserDto, UserSignUpDto } from './libs/types';

class UsersService {
  private readonly baseUrl: ApiRouteValue;
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.baseUrl = ApiRoute.USERS;
  }

  async get(id: number): Promise<UserDto> {
    const { data } = await this.client.get<UserDto>(`${this.baseUrl}/${id}`, {
      context: {
        avoidAuth: true,
      },
    });

    return data;
  }

  async create(payload: UserSignUpDto): Promise<UserDto> {
    const { data } = await this.client.post<UserDto>(this.baseUrl, payload, {
      context: {
        avoidAuth: true,
      },
    });

    return data;
  }
}

export { UsersService };
