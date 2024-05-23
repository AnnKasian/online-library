const CopyApiRoute = {
  CREATE: '/create',
  RESERVE: '/reserve',
  CLEAR: '/clear',
  GET_BY_BOOK: '/get/:id',
  GET_ALL: '/get-all',
  GET_RESERVED: '/get-reserved',
} as const;

type CopyApiRoute = (typeof CopyApiRoute)[keyof typeof CopyApiRoute];

export { CopyApiRoute };
