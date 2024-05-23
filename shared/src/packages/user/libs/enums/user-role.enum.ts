const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

type UserRole = (typeof UserRole)[keyof typeof UserRole];

export { UserRole };
