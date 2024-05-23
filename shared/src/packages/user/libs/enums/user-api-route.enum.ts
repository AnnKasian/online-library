const UserApiRoute = {
  AUTHENTICATE: '/authenticate',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

type UserApiRoute = (typeof UserApiRoute)[keyof typeof UserApiRoute];

export { UserApiRoute };
