import { createSlice } from '@reduxjs/toolkit';

import { CopiesExtendePageDto, CopyCreateDto } from '@/packages/copies';

import { DataStatus } from '#/libs/enums';

import {
  clear,
  create,
  getByBook,
  getByUser,
  getReserved,
  reserve,
} from './copies.actions';

const initialState: {
  copiesBook: CopyCreateDto | null;
  copiesUser: CopiesExtendePageDto | null;
  copiesReserved: CopiesExtendePageDto | null;
  dataStatus: {
    getByBook: DataStatus;
    getByUser: DataStatus;
    getReserved: DataStatus;
    create: DataStatus;
    reserve: DataStatus;
    clear: DataStatus;
  };
} = {
  copiesBook: null,
  copiesUser: null,
  copiesReserved: null,
  dataStatus: {
    getByBook: DataStatus.IDLE,
    getByUser: DataStatus.IDLE,
    getReserved: DataStatus.IDLE,
    create: DataStatus.IDLE,
    reserve: DataStatus.IDLE,
    clear: DataStatus.IDLE,
  },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'copies',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getByBook.pending, (state) => {
      state.dataStatus.getByBook = DataStatus.PENDING;
    });
    builder.addCase(getByBook.fulfilled, (state, { payload }) => {
      state.copiesBook = payload;
      state.dataStatus.getByBook = DataStatus.FULFILLED;
    });
    builder.addCase(getByBook.rejected, (state) => {
      state.dataStatus.getByBook = DataStatus.REJECTED;
    });

    builder.addCase(getByUser.pending, (state) => {
      state.dataStatus.getByUser = DataStatus.PENDING;
    });
    builder.addCase(getByUser.fulfilled, (state, action) => {
      state.copiesUser = action.payload;
      state.dataStatus.getByUser = DataStatus.FULFILLED;
    });
    builder.addCase(getByUser.rejected, (state) => {
      state.dataStatus.getByUser = DataStatus.REJECTED;
    });

    builder.addCase(getReserved.pending, (state) => {
      state.dataStatus.getReserved = DataStatus.PENDING;
    });
    builder.addCase(getReserved.fulfilled, (state, action) => {
      state.copiesReserved = action.payload;
      state.dataStatus.getReserved = DataStatus.FULFILLED;
    });
    builder.addCase(getReserved.rejected, (state) => {
      state.dataStatus.getReserved = DataStatus.REJECTED;
    });

    builder.addCase(create.pending, (state) => {
      state.dataStatus.create = DataStatus.PENDING;
    });
    builder.addCase(create.fulfilled, (state, { payload }) => {
      if (state.copiesBook && state.copiesBook.bookId === payload.bookId) {
        state.copiesBook.amount += payload.amount;
      }
      state.dataStatus.create = DataStatus.FULFILLED;
    });
    builder.addCase(create.rejected, (state) => {
      state.dataStatus.create = DataStatus.REJECTED;
    });

    builder.addCase(reserve.pending, (state) => {
      state.dataStatus.reserve = DataStatus.PENDING;
    });
    builder.addCase(reserve.fulfilled, (state, { payload }) => {
      if (state.copiesBook && state.copiesBook.bookId === payload.bookId) {
        state.copiesBook.amount -= 1;
      }
      state.dataStatus.reserve = DataStatus.FULFILLED;
    });
    builder.addCase(reserve.rejected, (state) => {
      state.dataStatus.reserve = DataStatus.REJECTED;
    });

    builder.addCase(clear.pending, (state) => {
      state.dataStatus.clear = DataStatus.PENDING;
    });
    builder.addCase(clear.fulfilled, (state, { payload }) => {
      if (state.copiesReserved) {
        state.copiesReserved.copies = state.copiesReserved.copies.filter(
          ({ id }) => id !== payload.id,
        );
      }
      state.dataStatus.clear = DataStatus.FULFILLED;
    });
    builder.addCase(clear.rejected, (state) => {
      state.dataStatus.clear = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
