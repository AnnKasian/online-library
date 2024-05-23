import { OrderType } from '#/libs/enums';

import { CopyStatus } from '../enums';

type CopyFilters = {
  bookId?: number;
  userId?: number;
  status?: CopyStatus;
  take?: number;
  returnedOrder?: OrderType;
};

export type { CopyFilters };
