import { CopyItem } from './copy-item.type';

type CopySearchStrategy = {
  search(bookId: number, userId: number): Promise<CopyItem>;
};

export type { CopySearchStrategy };
