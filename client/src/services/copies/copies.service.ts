import { AxiosInstance } from 'axios';

import { getEndpoint } from '@/libs/helpers';

import { ApiRoute } from '#/libs/enums';

import { CopyApiRoute } from './libs/enums';
import {
  CopiesExtendePageDto,
  CopiesPageDto,
  CopyCreateDto,
  CopyDto,
} from './libs/types';

class CopiesService {
  private readonly baseUrl: ApiRoute;
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.baseUrl = ApiRoute.COPIES;
  }

  async getByBook(bookId: number): Promise<CopiesPageDto> {
    const { data } = await this.client.get<CopiesPageDto>(
      getEndpoint(`${this.baseUrl}${CopyApiRoute.GET_BY_BOOK}`, {
        id: bookId,
      }),
    );

    return data;
  }

  async getAll(): Promise<CopiesExtendePageDto> {
    const { data } = await this.client.get<CopiesExtendePageDto>(
      `${this.baseUrl}${CopyApiRoute.GET_ALL}`,
    );

    return data;
  }

  async getReserved(): Promise<CopiesExtendePageDto> {
    const { data } = await this.client.get<CopiesExtendePageDto>(
      `${this.baseUrl}${CopyApiRoute.GET_RESERVED}`,
    );

    return data;
  }

  async create(payload: CopyCreateDto): Promise<CopyCreateDto> {
    const { data } = await this.client.post<CopyCreateDto>(
      `${this.baseUrl}${CopyApiRoute.CREATE}`,
      payload,
    );

    return data;
  }

  async reserve(bookId: number): Promise<CopyDto> {
    const { data } = await this.client.put<CopyDto>(
      `${this.baseUrl}${CopyApiRoute.RESERVE}`,
      {
        bookId,
      },
    );

    return data;
  }

  async clear(id: number): Promise<CopyDto> {
    const { data } = await this.client.put<CopyDto>(
      `${this.baseUrl}${CopyApiRoute.CLEAR}`,
      {
        id,
      },
    );

    return data;
  }
}

export { CopiesService };
