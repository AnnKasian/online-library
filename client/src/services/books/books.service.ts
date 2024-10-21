import { AxiosInstance } from 'axios';

import { getEndpoint } from '@/libs/helpers';

import { ApiRoute } from '#/libs/enums';

import { BookApiRoute } from './libs/enums';
import {
  BookCreateDto,
  BookDto,
  BookUpdateDto,
  BooksPageDto,
} from './libs/types';

class BooksService {
  private readonly baseUrl: ApiRoute;
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.baseUrl = ApiRoute.BOOKS;
  }

  async get(id: number): Promise<BookDto> {
    const { data } = await this.client.get<BookDto>(
      getEndpoint(`${this.baseUrl}${BookApiRoute.GET}`, {
        id,
      }),
    );

    return data;
  }

  async getAll(): Promise<BooksPageDto> {
    const { data } = await this.client.get<BooksPageDto>(
      `${this.baseUrl}${BookApiRoute.GET_ALL}`,
    );

    return data;
  }

  async create(payload: BookCreateDto): Promise<BookDto> {
    const { data } = await this.client.post<BookDto>(
      `${this.baseUrl}${BookApiRoute.CREATE}`,
      payload,
    );

    return data;
  }

  async update(id: number, payload: BookUpdateDto): Promise<BookDto> {
    const { data } = await this.client.put<BookDto>(
      getEndpoint(`${this.baseUrl}${BookApiRoute.UPDATE}`, {
        id,
      }),
      payload,
    );

    return data;
  }
}

export { BooksService };
