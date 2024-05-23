import { Prisma } from '@prisma/client';

import { ItemRepository } from '#/libs/types';
import { PrismaService } from '#/services/prisma';

import { CopyItemBuilder } from './copies-item.builder';
import { CopiesManager } from './copies.manager';
import { CopyStatus } from './libs/enums';
import { CopyFilters, CopyItem, CopyRaw } from './libs/types';

class CopiesRepository extends ItemRepository<CopyItem> {
  private readonly copiesManager: CopiesManager;
  private readonly copies: Prisma.CopyDelegate;

  constructor() {
    super();
    this.copies = PrismaService.instance.copy;
    this.copiesManager = new CopiesManager(new CopyItemBuilder());
  }

  async find({ id }: Partial<CopyItem>): Promise<CopyItem | null> {
    const copy = await this.copies.findFirst({
      where: {
        id,
      },
    });

    return copy ? this.copiesManager.initializeRaw(copy) : null;
  }

  async findAll({
    bookId,
    userId,
    status,
    take,
    returnedOrder,
  }: CopyFilters): Promise<CopyItem[]> {
    const copies = await this.copies.findMany({
      where: {
        AND: [
          {
            bookId,
            userId,
          },
          {
            ...(status === CopyStatus.FREE && {
              userId: null,
            }),
            ...(status === CopyStatus.RESERVED && {
              userId: {
                not: null,
              },
            }),
          },
        ],
      },
      orderBy: {
        returnedAt: returnedOrder,
      },
      take,
    });

    return copies.map((copy) => this.copiesManager.initializeRaw(copy));
  }

  create(): Promise<CopyItem> {
    return Promise.resolve({} as CopyItem);
  }

  async createAll(data: CopyItem[]): Promise<number> {
    const copies = await this.copies.createMany({
      data: data.map(({ bookId, returnedAt }) => ({ bookId, returnedAt })),
    });

    return copies.count;
  }

  async update(
    id: number,
    { bookId, userId }: Partial<CopyRaw>,
  ): Promise<CopyItem> {
    const copy = await this.copies.update({
      where: {
        id,
      },
      data: {
        bookId,
        userId,
      },
    });

    return this.copiesManager.initializeRaw(copy);
  }

  delete(): Promise<CopyItem> {
    return Promise.resolve({} as CopyItem);
  }
}

export { CopiesRepository };
