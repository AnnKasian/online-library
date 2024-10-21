import { Prisma } from '@prisma/client';

import { ItemRepository } from '#/libs/types';
import { PrismaService } from '#/services/prisma';

import { BookItemBuilder } from './book-item.builder';
import { BooksManager } from './book.manager';
import { BookFilters, BookItem } from './libs/types';

class BooksRepository extends ItemRepository<BookItem> {
  private readonly booksManager: BooksManager<BookItem>;
  private readonly books: Prisma.BookDelegate;

  constructor() {
    super();
    this.books = PrismaService.instance.book;
    this.booksManager = new BooksManager(new BookItemBuilder());
  }

  async find({ id, title }: BookFilters): Promise<BookItem | null> {
    const book = await this.books.findFirst({
      where: {
        id,
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
      include: {
        author: true,
        genre: true,
      },
    });

    return book ? this.booksManager.initializeRaw(book) : null;
  }

  async create({
    title,
    author,
    genre,
    description,
  }: BookItem): Promise<BookItem> {
    const book = await this.books.create({
      data: {
        title,
        author: {
          connectOrCreate: {
            where: {
              fullName: author,
            },
            create: {
              fullName: author,
            },
          },
        },
        genre: {
          connectOrCreate: {
            where: {
              type: genre,
            },
            create: {
              type: genre,
            },
          },
        },
        description,
      },
      include: {
        author: true,
        genre: true,
      },
    });

    return this.booksManager.initializeRaw(book);
  }

  createAll(): Promise<number> {
    return Promise.resolve(0);
  }

  async update(
    id: number,
    { title, author, genre, description }: Partial<BookItem>,
  ): Promise<BookItem> {
    const book = await this.books.update({
      where: {
        id,
      },
      data: {
        title,
        ...(author && {
          author: {
            connectOrCreate: {
              where: {
                fullName: author,
              },
              create: {
                fullName: author,
              },
            },
          },
        }),
        ...(genre && {
          genre: {
            connectOrCreate: {
              where: {
                type: genre,
              },
              create: {
                type: genre,
              },
            },
          },
        }),
        description,
      },
      include: {
        author: true,
        genre: true,
      },
    });

    return this.booksManager.initializeRaw(book);
  }
  async findAll(ids?: number[]): Promise<BookItem[]> {
    const books = await this.books.findMany({
      where: {
        ...(ids && {
          id: {
            in: ids,
          },
        }),
      },
      include: {
        author: true,
        genre: true,
      },
    });

    return books.map((book) => this.booksManager.initializeRaw(book));
  }
  delete(): Promise<BookItem> {
    return Promise.resolve({} as BookItem);
  }
}

export { BooksRepository };
