import { createAsyncThunk } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from '#/providers/store';
import { StorageKey } from '#/services/storage';
import { UserDto, UserSignInDto, UserSignUpDto } from '#/services/users';

import { name } from './users.slice';

const authenticate = createAsyncThunk<UserDto, undefined, AsyncThunkConfig>(
  `${name}/authenticate`,
  async (_, { extra }) => {
    const { usersService } = extra;

    return await usersService.authenticate();
  },
);

const signIn = createAsyncThunk<UserDto, UserSignInDto, AsyncThunkConfig>(
  `${name}/sign-in`,
  async (payload, { extra }) => {
    const { usersService, storageService } = extra;

    const user = await usersService.signIn(payload);
    storageService.set(StorageKey.TOKEN, user.id.toString());

    return user;
  },
);

const signUp = createAsyncThunk<UserDto, UserSignUpDto, AsyncThunkConfig>(
  `${name}/sign-up`,
  async (payload, { extra }) => {
    const { usersService, storageService } = extra;

    const user = await usersService.signUp(payload);
    storageService.set(StorageKey.TOKEN, user.id.toString());

    return user;
  },
);

const signOut = createAsyncThunk<undefined, undefined, AsyncThunkConfig>(
  `${name}/sign-out`,
  (_, { extra }) => {
    const { storageService } = extra;

    storageService.drop(StorageKey.TOKEN);

    return undefined;
  },
);

export { authenticate, signIn, signUp, signOut };
