import { Router } from 'express';

import { HttpCode } from '#/libs/enums';
import { handleAsync, handleRole, validateSchemas } from '#/libs/middlewares';
import { idDtoSchema } from '#/libs/schemas';
import { IdDto, ItemController } from '#/libs/types';

import { UserRole } from '../user';
import { BooksService } from './book.service';
import { BookApiRoute } from './libs/enums';
import { bookCreateDtoSchema, bookUpdateDtoSchema } from './libs/schemas';
import {
  BookCreateDto,
  BookDto,
  BookUpdateDto,
  BooksPageDto,
} from './libs/types';

class BooksController extends ItemController {
  delete = undefined;

  constructor(
    private readonly booksRouter: Router,
    private readonly booksService: BooksService,
  ) {
    super();
  }

  post(): void {
    this.booksRouter.post<string, {}, BookDto, BookCreateDto>(
      BookApiRoute.CREATE,
      handleRole(UserRole.ADMIN),
      validateSchemas({
        body: bookCreateDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const payload = request.body;
        const book = await this.booksService.create(payload);

        response.status(HttpCode.CREATED).json(book);
      }),
    );
  }

  put(): void {
    this.booksRouter.put<string, IdDto, BookDto, BookUpdateDto>(
      BookApiRoute.UPDATE,
      handleRole(UserRole.ADMIN),
      validateSchemas({
        params: idDtoSchema,
        body: bookUpdateDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const id = request.params.id;
        const payload = request.body;
        const book = await this.booksService.update(id, payload);

        response.status(HttpCode.OK).json(book);
      }),
    );
  }

  get(): void {
    this.booksRouter.get<string, IdDto, BookDto>(
      BookApiRoute.GET,
      validateSchemas({
        params: idDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const payload = request.params;
        const book = await this.booksService.getByFilter(payload);

        response.status(HttpCode.OK).json(book);
      }),
    );
  }
  getAll(): void {
    this.booksRouter.get<string, {}, BooksPageDto>(
      BookApiRoute.GET_ALL,
      handleAsync(async (_request, response) => {
        const book = await this.booksService.getAll();

        response.status(HttpCode.OK).json(book);
      }),
    );
  }
}
export { BooksController };
