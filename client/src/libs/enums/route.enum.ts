const Route = {
  ROOT: '/',
  OTHER: '*',
} as const;

type Route = (typeof Route)[keyof typeof Route];

export { Route };
