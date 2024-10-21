import { create, get, getAll, update } from './books.actions';

const booksActions = {
  get,
  getAll,
  create,
  update,
} as const;

export { booksActions };
export { reducer as booksReducer } from './books.slice';
