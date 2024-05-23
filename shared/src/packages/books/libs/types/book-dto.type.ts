type BookDto = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { BookDto };
