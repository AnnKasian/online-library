import { HttpCode, OrderType } from '#/libs/enums';
import { HttpException } from '#/libs/exceptions';

import { CopiesRepository } from './copies.repository';
import { CopyExceptionMessage, CopyStatus } from './libs/enums';
import { CopyItem, CopySearchStrategy } from './libs/types';

class CopyReturnSearchStrategy implements CopySearchStrategy {
  constructor(private readonly copiesRepository: CopiesRepository) {}

  async search(bookId: number): Promise<CopyItem> {
    const [book] = await this.copiesRepository.findAll({
      bookId,
      returnedOrder: OrderType.ASC,
      status: CopyStatus.FREE,
      take: 1,
    });

    if (!book) {
      throw new HttpException(
        HttpCode.NOT_FOUND,
        CopyExceptionMessage.COPY_NOT_FOUND,
      );
    }

    return book;
  }
}

export { CopyReturnSearchStrategy };
