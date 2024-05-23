import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '#/providers/store';
import { UserDto, UserSignUpDto } from '#/services/users';

import { name } from './users.slice';

const get = createAsyncThunk<UserDto, number, AsyncThunkConfig>(
  `${name}/get`,
  async (payload, { extra }) => {
    const { usersService } = extra;

    return await usersService.get(payload);
  },
);

const create = createAsyncThunk<UserDto, UserSignUpDto, AsyncThunkConfig>(
  `${name}/create`,
  async (payload, { extra }) => {
    const { usersService } = extra;

    return await usersService.create(payload);
  },
);

export { get, create };
