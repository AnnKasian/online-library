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
    this.book.title = title;
    this.book.author = author;
    this.book.genre = genre;
    this.book.description = description ?? undefined;
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
    this.book.id = id;
    this.book.createdAt = createdAt;
    this.book.updatedAt = updatedAt;
  }
}

export { BookItemBuilder };
