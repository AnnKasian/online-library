import { CopyBuilder, CopyRaw } from './libs/types';

class CopiesManager<Type> {
  constructor(private builder: CopyBuilder<Type>) {}

  initialize(copy: {
    bookId: number;
    userId?: number;
    returnedAt: Date;
  }): Type {
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
  }: CopyRaw): Type {
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
