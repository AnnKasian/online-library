import { authenticate, signIn, signOut, signUp } from './users.actions';

const usersActions = {
  signOut,
  authenticate,
  signIn,
  signUp,
} as const;

export { usersActions };
export { reducer as usersReducer } from './users.slice';
