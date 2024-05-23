import { z } from 'zod';

import { copyCreateDtoSchema } from '../schemas';

type CopyCreateDto = z.infer<typeof copyCreateDtoSchema>;

export type { CopyCreateDto };
