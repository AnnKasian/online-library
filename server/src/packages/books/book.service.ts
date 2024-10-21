import { BookCreateDto, BookUpdateDto } from '@/packages/books/libs/types';

import { HttpCode } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';

import { BookItemBuilder } from './book-item.builder';
import { BooksManager } from './book.manager';
import { BooksRepository } from './book.repository';
import { BookExceptionMessage } from './libs/enums';
import { BookFilters, BookItem, BooksPageDto } from './libs/types';

class BooksService {
  private readonly booksManager: BooksManager<BookItem>;

  constructor(private readonly booksRepository: BooksRepository) {
    this.booksManager = new BooksManager(new BookItemBuilder());
  }

  async getByFilter(filters: BookFilters): Promise<BookItem> {
    const findedBook = await this.booksRepository.find(filters);

    if (!findedBook) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        BookExceptionMessage.BOOK_NOT_FOUND,
      );
    }

    return findedBook;
  }

  async create({
    title,
    author,
    genre,
    description,
  }: BookCreateDto): Promise<BookItem> {
    return this.booksRepository.create(
      this.booksManager.initialize({
        title,
        author,
        genre,
        description,
      }),
    );
  }

  async update(
    id: number,
    { title, author, genre, description }: BookUpdateDto,
  ): Promise<BookItem> {
    const findedBook = await this.booksRepository.find({ id });

    if (!findedBook) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        BookExceptionMessage.BOOK_NOT_FOUND,
      );
    }

    return this.booksRepository.update(id, {
      title,
      author,
      genre,
      description,
    });
  }

  async getAll(ids?: number[]): Promise<BooksPageDto> {
    const books = await this.booksRepository.findAll(ids);

    return {
      books: ids
        ? ids.map((id) => {
            const findedBooks = books.find((book) => book.id === id);

            if (!findedBooks) {
              throw new HttpException(
                HttpCode.NOT_FOUND,
                BookExceptionMessage.BOOK_NOT_FOUND,
              );
            }
            return findedBooks;
          })
        : books,
    };
  }
}

export { BooksService };
