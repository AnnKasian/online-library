import { BookBuilder, BookRaw } from './libs/types';

class BooksManager<Type> {
  constructor(private builder: BookBuilder<Type>) {}

  initialize(book: {
    title: string;
    author: string;
    genre: string;
    description?: string;
  }): Type {
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
  }: BookRaw): Type {
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
