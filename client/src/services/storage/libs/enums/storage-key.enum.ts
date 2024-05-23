const StorageKey = {
  TOKEN: 'token',
} as const;

type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];

export { StorageKey };
