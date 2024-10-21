import { CopyCreateDto } from '@/packages/copies';

import { HttpCode, OrderType } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';
import { addMonths } from '#/libs/helpers';

import { BooksService } from '../books';
import { CopyItemBuilder } from './copies-item.builder';
import { CopiesManager } from './copies.manager';
import { CopiesRepository } from './copies.repository';
import { CopyExceptionMessage } from './libs/enums';
import { CopyFilters, CopyItem, CopySearchStrategy } from './libs/types';

class CopiesService {
  private readonly copiesManager: CopiesManager<CopyItem>;

  constructor(
    private readonly copiesRepository: CopiesRepository,
    private readonly copiesStrategy: CopySearchStrategy,
    private readonly booksService: BooksService,
  ) {
    this.copiesManager = new CopiesManager(new CopyItemBuilder());
  }

  async get(id: CopyItem): Promise<CopyItem> {
    const findedCopy = await this.copiesRepository.find(id);

    if (!findedCopy) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        CopyExceptionMessage.COPY_NOT_FOUND,
      );
    }

    return findedCopy;
  }
  getAll(filters: CopyFilters): Promise<CopyItem[]> {
    return this.copiesRepository.findAll({
      returnedOrder: OrderType.DESC,
      ...filters,
    });
  }

  async createAll({ bookId, amount }: CopyCreateDto): Promise<number> {
    await this.booksService.getByFilter({ id: bookId });
    const copiesData = [];

    for (let i = 0; i < amount; i++) {
      const copy = this.copiesManager.initialize({
        bookId,
        returnedAt: new Date(1),
      });
      copiesData.push(copy);
    }

    return this.copiesRepository.createAll(copiesData);
  }

  async reserve(bookId: number, userId: number): Promise<CopyItem> {
    await this.booksService.getByFilter({ id: bookId });

    const { id } = await this.copiesStrategy.search(bookId, userId);
    const returnedAt = addMonths(new Date(), 1);

    return this.copiesRepository.update(id, {
      userId,
      returnedAt,
    });
  }

  async clear(id: number): Promise<CopyItem> {
    const copy = await this.copiesRepository.find({ id });

    if (!copy) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        CopyExceptionMessage.COPY_NOT_FOUND,
      );
    }

    return this.copiesRepository.update(id, {
      userId: null,
    });
  }
}

export { CopiesService };
