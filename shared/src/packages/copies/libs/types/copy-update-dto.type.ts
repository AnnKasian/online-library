import { z } from 'zod';

import { copyUpdateDtoSchema } from '../schemas';

type CopyUpdateDto = z.infer<typeof copyUpdateDtoSchema>;

export type { CopyUpdateDto };
