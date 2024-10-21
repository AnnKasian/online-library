const DateFormat = {
  FULL_DATE: 'd MMM yyyy',
} as const;

type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

export { DateFormat };
