const UserExceptionMessage = {
  USER_NOT_FOUND: 'User was not found.',
  USER_EXISTS: 'User with this creadentials already exists.',
  USER_UNAUTHORIZED: 'User is not authorized.',
  USER_ROLE: 'User does not have enough permission',
} as const;

export { UserExceptionMessage };
