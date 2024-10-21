const Route = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  BOOKS: '/books',
  BOOK_$ID: '/books/:id',
  BOOKS_CREATE: '/admin/book/create',
  BOOKS_UPDATE_$ID: '/admin/book/update/:id',
  MY_COPIES: '/my-copies',
  COPIES: '/admin/copies',
  ROOT: '/',
  OTHER: '*',
} as const;

type Route = (typeof Route)[keyof typeof Route];

export { Route };
