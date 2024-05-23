import { createSlice } from '@reduxjs/toolkit';

import { DataStatus, DataStatusValue } from '#/libs/enums';
import { UserDto } from '#/services/users';

import { create, get } from './users.actions';

const initialState: {
  user: UserDto | null;
  dataStatus: {
    get: DataStatusValue;
    create: DataStatusValue;
  };
} = {
  user: null,
  dataStatus: {
    get: DataStatus.IDLE,
    create: DataStatus.IDLE,
  },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(get.pending, (state) => {
      state.dataStatus.get = DataStatus.PENDING;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus.get = DataStatus.FULFILLED;
    });
    builder.addCase(get.rejected, (state) => {
      state.dataStatus.get = DataStatus.REJECTED;
    });

    builder.addCase(create.pending, (state) => {
      state.dataStatus.create = DataStatus.PENDING;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus.create = DataStatus.FULFILLED;
    });
    builder.addCase(create.rejected, (state) => {
      state.dataStatus.create = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
