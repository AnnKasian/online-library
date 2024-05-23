const BookApiRoute = {
  CREATE: '/create',
  UPDATE: '/update/:id',
  GET: '/get/:id',
  GET_ALL: '/get-all',
} as const;

type BookApiRoute = (typeof BookApiRoute)[keyof typeof BookApiRoute];

export { BookApiRoute };
