import { z } from 'zod';

import { bookUpdateDtoSchema } from '../schemas';

type BookUpdateDto = z.infer<typeof bookUpdateDtoSchema>;

export type { BookUpdateDto };
