import { BookBuilder, BookItem } from './libs/types';

class BookItemBuilder implements BookBuilder<BookItem> {
  private book!: BookItem;

  constructor() {
    this.reset();
  }

  reset() {
    this.book = {
      id: 0,
      title: '',
      author: '',
      genre: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getResult(): BookItem {
    return this.book;
  }

  addInfo({
    title,
    author,
    genre,
    description,
  }: {
    title: string;
    author: string;
    genre: string;
    description?: string;
  }): void {
    this.book = {
      ...this.book,
      title,
      author,
      genre,
      description: description ?? undefined,
    };
  }

  addExtra({
    id,
    createdAt,
    updatedAt,
  }: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }): void {
    this.book = {
      ...this.book,
      id,
      createdAt,
      updatedAt,
    };
  }
}

export { BookItemBuilder };
