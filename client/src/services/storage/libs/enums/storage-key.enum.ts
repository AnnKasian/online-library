const StorageKey = {
  TOKEN: 'token',
  THEME: 'theme',
} as const;

type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];

export { StorageKey };
