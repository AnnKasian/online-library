import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '#/providers/store';
import {
  BookCreateDto,
  BookDto,
  BookUpdateDto,
  BooksPageDto,
} from '#/services/books';

import { name } from './books.slice';

const get = createAsyncThunk<BookDto, number, AsyncThunkConfig>(
  `${name}/get`,
  async (payload, { extra }) => {
    const { booksService } = extra;

    return await booksService.get(payload);
  },
);

const getAll = createAsyncThunk<BooksPageDto, undefined, AsyncThunkConfig>(
  `${name}/get-all`,
  async (_, { extra }) => {
    const { booksService } = extra;

    return await booksService.getAll();
  },
);

const create = createAsyncThunk<BookDto, BookCreateDto, AsyncThunkConfig>(
  `${name}/create`,
  async (payload, { extra }) => {
    const { booksService } = extra;

    return await booksService.create(payload);
  },
);

const update = createAsyncThunk<
  BookDto,
  { id: number } & BookUpdateDto,
  AsyncThunkConfig
>(`${name}/update`, async ({ id, ...payload }, { extra }) => {
  const { booksService } = extra;

  return await booksService.update(id, payload);
});

export { get, getAll, create, update };
