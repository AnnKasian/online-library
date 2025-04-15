const UserApiRoute = {
  AUTHENTICATE: '/authenticate',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  UPDATE: '/update/:id',
} as const;

type UserApiRoute = (typeof UserApiRoute)[keyof typeof UserApiRoute];

export { UserApiRoute };
