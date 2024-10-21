import { booksReducer } from '#/slices/books';
import { copiesReducer } from '#/slices/copies';
import { usersReducer } from '#/slices/users';

type AppReducers = {
  users: ReturnType<typeof usersReducer>;
  books: ReturnType<typeof booksReducer>;
  copies: ReturnType<typeof copiesReducer>;
};

export type { AppReducers };
