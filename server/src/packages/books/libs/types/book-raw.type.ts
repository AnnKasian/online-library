type BookRaw = {
  id: number;
  title: string;
  author: { fullName: string };
  genre: { type: string };
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type { BookRaw };
