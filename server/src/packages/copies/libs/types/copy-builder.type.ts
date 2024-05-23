type CopyBuilder<T> = {
  reset(): void;
  addInfo(fields: { bookId: number; userId?: number; returnedAt: Date }): void;
  addExtra(fields: { id: number; createdAt: Date; updatedAt: Date }): void;
  getResult(): T;
};

export type { CopyBuilder };
