import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '#/providers/store';
import {
  CopiesExtendePageDto,
  CopyCreateDto,
  CopyDto,
} from '#/services/copies';

import { name } from './copies.slice';

const getByBook = createAsyncThunk<CopyCreateDto, number, AsyncThunkConfig>(
  `${name}/get-by-book`,
  async (payload, { extra }) => {
    const { copiesService } = extra;

    const copies = await copiesService.getByBook(payload);

    return {
      bookId: payload,
      amount: copies.copies.length,
    };
  },
);

const getByUser = createAsyncThunk<
  CopiesExtendePageDto,
  undefined,
  AsyncThunkConfig
>(`${name}/get-all`, async (_, { extra }) => {
  const { copiesService } = extra;

  return await copiesService.getAll();
});

const getReserved = createAsyncThunk<
  CopiesExtendePageDto,
  undefined,
  AsyncThunkConfig
>(`${name}/get-reserved`, async (_, { extra }) => {
  const { copiesService } = extra;

  return await copiesService.getReserved();
});

const create = createAsyncThunk<CopyCreateDto, CopyCreateDto, AsyncThunkConfig>(
  `${name}/create`,
  async (payload, { extra }) => {
    const { copiesService } = extra;

    return await copiesService.create(payload);
  },
);

const reserve = createAsyncThunk<CopyDto, number, AsyncThunkConfig>(
  `${name}/reserve`,
  async (payload, { extra }) => {
    const { copiesService } = extra;

    return await copiesService.reserve(payload);
  },
);

const clear = createAsyncThunk<CopyDto, number, AsyncThunkConfig>(
  `${name}/clear`,
  async (payload, { extra }) => {
    const { copiesService } = extra;

    return await copiesService.clear(payload);
  },
);

export { getByBook, getByUser, getReserved, create, reserve, clear };
