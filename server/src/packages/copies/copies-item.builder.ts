import { CopyBuilder, CopyItem } from './libs/types';

class CopyItemBuilder implements CopyBuilder<CopyItem> {
  private copy!: CopyItem;

  constructor() {
    this.reset();
  }

  reset() {
    this.copy = {
      id: 0,
      bookId: 0,
      userId: 0,
      returnedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getResult(): CopyItem {
    return this.copy;
  }

  addInfo({
    bookId,
    userId,
    returnedAt,
  }: {
    bookId: number;
    userId?: number;
    returnedAt: Date;
  }): void {
    this.copy = {
      ...this.copy,
      bookId,
      userId,
      returnedAt,
    };
  }

  addExtra({
    id,
    createdAt,
    updatedAt,
  }: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }): void {
    this.copy = {
      ...this.copy,
      id,
      createdAt,
      updatedAt,
    };
  }
}

export { CopyItemBuilder };
