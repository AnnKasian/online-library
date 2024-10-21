import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#/libs/enums';
import { BookDto, BooksPageDto } from '#/services/books';

import { create, get, getAll, update } from './books.actions';

const initialState: {
  book: BookDto | null;
  books: BooksPageDto | null;
  dataStatus: {
    get: DataStatus;
    getAll: DataStatus;
    create: DataStatus;
    update: DataStatus;
  };
} = {
  book: null,
  books: null,
  dataStatus: {
    get: DataStatus.IDLE,
    getAll: DataStatus.IDLE,
    create: DataStatus.IDLE,
    update: DataStatus.IDLE,
  },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'books',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(get.pending, (state) => {
      state.dataStatus.get = DataStatus.PENDING;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.book = action.payload;
      state.dataStatus.get = DataStatus.FULFILLED;
    });
    builder.addCase(get.rejected, (state) => {
      state.dataStatus.get = DataStatus.REJECTED;
    });

    builder.addCase(getAll.pending, (state) => {
      state.dataStatus.getAll = DataStatus.PENDING;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.books = action.payload;
      state.dataStatus.getAll = DataStatus.FULFILLED;
    });
    builder.addCase(getAll.rejected, (state) => {
      state.dataStatus.getAll = DataStatus.REJECTED;
    });

    builder.addCase(create.pending, (state) => {
      state.dataStatus.create = DataStatus.PENDING;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.book = action.payload;
      state.dataStatus.create = DataStatus.FULFILLED;
    });
    builder.addCase(create.rejected, (state) => {
      state.dataStatus.create = DataStatus.REJECTED;
    });

    builder.addCase(update.pending, (state) => {
      state.dataStatus.update = DataStatus.PENDING;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.book = action.payload;
      state.dataStatus.update = DataStatus.FULFILLED;
    });
    builder.addCase(update.rejected, (state) => {
      state.dataStatus.update = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
