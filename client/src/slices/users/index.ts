import { create, get } from './users.actions';

const actions = {
  get,
  create,
};

export { actions as usersActions };
export { reducer as usersReducer } from './users.slice';
