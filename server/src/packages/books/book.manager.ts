import { BookItemBuilder } from './book-item.builder';
import { BookItem, BookRaw } from './libs/types';

class BooksManager {
  constructor(private builder: BookItemBuilder) {}

  initialize(book: {
    title: string;
    author: string;
    genre: string;
    description?: string;
  }): BookItem {
    this.builder.addInfo(book);

    return this.builder.getResult();
  }

  initializeRaw({
    id,
    title,
    author,
    genre,
    description,
    createdAt,
    updatedAt,
  }: BookRaw): BookItem {
    this.builder.addInfo({
      title,
      author: author.fullName,
      genre: genre.type,
      description: description ?? undefined,
    });
    this.builder.addExtra({
      id,
      createdAt,
      updatedAt,
    });

    return this.builder.getResult();
  }
}

export { BooksManager };
