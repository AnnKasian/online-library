import { CopyItemBuilder } from './copies-item.builder';
import { CopyItem, CopyRaw } from './libs/types';

class CopiesManager {
  constructor(private builder: CopyItemBuilder) {}

  initialize(copy: {
    bookId: number;
    userId?: number;
    returnedAt: Date;
  }): CopyItem {
    this.builder.addInfo(copy);

    return this.builder.getResult();
  }

  initializeRaw({
    id,
    bookId,
    userId,
    returnedAt,
    createdAt,
    updatedAt,
  }: CopyRaw): CopyItem {
    this.builder.addInfo({
      bookId: bookId,
      userId: userId ?? undefined,
      returnedAt: returnedAt,
    });
    this.builder.addExtra({
      id,
      createdAt,
      updatedAt,
    });

    return this.builder.getResult();
  }
}

export { CopiesManager };
