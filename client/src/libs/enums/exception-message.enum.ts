const ExceptionMessage = {
  UNKNOWN_EXCEPTION: 'Unknown exception.',
} as const;

type ExceptionMessage =
  (typeof ExceptionMessage)[keyof typeof ExceptionMessage];

export { ExceptionMessage };
