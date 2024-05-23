import { Router } from 'express';

import { HttpCode } from '#/libs/enums';
import { handleAsync, handleRole, validateSchemas } from '#/libs/middlewares';
import { idDtoSchema } from '#/libs/schemas';
import { IdDto, ItemController } from '#/libs/types';

import { BookItem, BooksService } from '../books';
import { UserItem, UserRole, UsersService } from '../user';
import { CopiesService } from './copies.service';
import { CopyApiRoute, CopyStatus } from './libs/enums';
import { copyCreateDtoSchema, copyUpdateDtoSchema } from './libs/schemas';
import {
  CopiesExtendePageDto,
  CopiesPageDto,
  CopyCreateDto,
  CopyDto,
  CopyExtendedDto,
  CopyUpdateDto,
} from './libs/types';

class CopiesController extends ItemController {
  get = undefined;
  delete = undefined;

  constructor(
    private readonly copiesRouter: Router,
    private readonly copiesService: CopiesService,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  useRoutes(): void {
    super.useRoutes();
    this.getAllReserved();
    this.getAllUserReserved();
    this.clear();
  }

  getAll(): void {
    this.copiesRouter.get<string, IdDto, CopiesPageDto>(
      CopyApiRoute.GET_BY_BOOK,
      validateSchemas({
        params: idDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const id = request.params.id;
        const copies = await this.copiesService.getAll({ bookId: id });

        response.status(HttpCode.OK).json({ copies });
      }),
    );
  }

  getAllUserReserved(): void {
    this.copiesRouter.get<string, {}, CopiesExtendePageDto>(
      CopyApiRoute.GET_ALL,
      handleAsync(async (request, response) => {
        const id = request.user.id;
        const copies = await this.copiesService.getAll({ userId: id });

        response.status(HttpCode.OK).json({
          copies: await this.getExtended(copies),
        });
      }),
    );
  }

  getAllReserved(): void {
    this.copiesRouter.get<string, {}, CopiesExtendePageDto>(
      CopyApiRoute.GET_RESERVED,
      handleRole(UserRole.ADMIN),
      handleAsync(async (_request, response) => {
        const copies = await this.copiesService.getAll({
          status: CopyStatus.RESERVED,
        });

        response.status(HttpCode.OK).json({
          copies: await this.getExtended(copies),
        });
      }),
    );
  }

  post(): void {
    this.copiesRouter.post<string, {}, {}, CopyCreateDto>(
      CopyApiRoute.CREATE,
      handleRole(UserRole.ADMIN),
      validateSchemas({
        body: copyCreateDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const payload = request.body;
        const copies = await this.copiesService.createAll(payload);

        response.status(HttpCode.CREATED).json(copies);
      }),
    );
  }

  put(): void {
    this.copiesRouter.put<string, {}, CopyDto, CopyUpdateDto>(
      CopyApiRoute.RESERVE,
      validateSchemas({
        body: copyUpdateDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const userId = request.user.id;
        const bookId = request.body.bookId;
        const copy = await this.copiesService.reserve(bookId, userId);

        response.status(HttpCode.OK).json(copy);
      }),
    );
  }

  clear(): void {
    this.copiesRouter.put<string, {}, CopyDto, IdDto>(
      CopyApiRoute.CLEAR,
      handleRole(UserRole.ADMIN),
      validateSchemas({
        body: idDtoSchema,
      }),
      handleAsync(async (request, response) => {
        const id = request.body.id;
        const copies = await this.copiesService.clear(id);

        response.status(HttpCode.OK).json(copies);
      }),
    );
  }

  private async getExtended(copies: CopyDto[]): Promise<CopyExtendedDto[]> {
    const users = await this.usersService.getAll(
      copies.map(({ userId }) => userId).filter(Boolean) as number[],
    );
    const books = await this.booksService.getAll(
      copies.map(({ bookId }) => bookId),
    );

    return copies.map(({ userId, bookId, ...copy }, index) => ({
      ...copy,
      user: users[index] as UserItem,
      book: books.books[index] as BookItem,
    }));
  }
}
export { CopiesController };
