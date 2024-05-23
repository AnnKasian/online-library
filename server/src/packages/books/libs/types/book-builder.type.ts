type BookBuilder<T> = {
  reset(): void;
  addInfo(fields: {
    title: string;
    author: string;
    genre: string;
    description?: string;
  }): void;
  addExtra(fields: { id: number; createdAt: Date; updatedAt: Date }): void;
  getResult(): T;
};

export type { BookBuilder };
