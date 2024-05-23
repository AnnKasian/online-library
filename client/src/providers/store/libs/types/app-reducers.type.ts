import { usersReducer } from '#/slices/users';

type AppReducers = {
  users: ReturnType<typeof usersReducer>;
};

export type { AppReducers };
