import { z } from 'zod';

import { copyReserveDtoSchema } from '../schemas';

type CopyReserveDto = z.infer<typeof copyReserveDtoSchema>;

export type { CopyReserveDto };
