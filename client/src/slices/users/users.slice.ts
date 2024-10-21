import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '#/libs/enums';
import { UserDto } from '#/services/users';

import { authenticate, signIn, signOut, signUp } from './users.actions';

const initialState: {
  user: UserDto | null;
  dataStatus: {
    authenticate: DataStatus;
    register: DataStatus;
  };
} = {
  user: null,
  dataStatus: {
    authenticate: DataStatus.IDLE,
    register: DataStatus.IDLE,
  },
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'users',
  reducers: {
    signOut(state) {
      state.user = null;
      state.dataStatus.authenticate = DataStatus.REJECTED;
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticate.pending, (state) => {
      state.dataStatus.authenticate = DataStatus.PENDING;
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus.authenticate = DataStatus.FULFILLED;
    });
    builder.addCase(authenticate.rejected, (state) => {
      state.dataStatus.authenticate = DataStatus.REJECTED;
      state.dataStatus.register = DataStatus.REJECTED;
    });

    builder.addCase(signIn.pending, (state) => {
      state.dataStatus.register = DataStatus.PENDING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus.register = DataStatus.FULFILLED;
      state.dataStatus.authenticate = DataStatus.FULFILLED;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.user = null;
      state.dataStatus.register = DataStatus.REJECTED;
      state.dataStatus.authenticate = DataStatus.REJECTED;
    });

    builder.addCase(signUp.pending, (state) => {
      state.dataStatus.register = DataStatus.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.dataStatus.authenticate = DataStatus.FULFILLED;
      state.dataStatus.register = DataStatus.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.user = null;
      state.dataStatus.authenticate = DataStatus.REJECTED;
      state.dataStatus.register = DataStatus.REJECTED;
    });

    builder.addCase(signOut.pending, (state) => {
      state.dataStatus.authenticate = DataStatus.PENDING;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.dataStatus.authenticate = DataStatus.REJECTED;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.dataStatus.authenticate = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
