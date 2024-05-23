const ApiRoute = {
  USERS: '/users',
  BOOKS: '/books',
  COPIES: '/copies',
} as const;

type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];

export { ApiRoute };
