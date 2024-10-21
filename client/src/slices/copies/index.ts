import {
  clear,
  create,
  getByBook,
  getByUser,
  getReserved,
  reserve,
} from './copies.actions';

const copiesActions = {
  getByBook,
  getByUser,
  getReserved,
  create,
  reserve,
  clear,
} as const;

export { copiesActions };
export { reducer as copiesReducer } from './copies.slice';
