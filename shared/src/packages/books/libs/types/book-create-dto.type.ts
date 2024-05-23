import { z } from 'zod';

import { bookCreateDtoSchema } from '../schemas';

type BookCreateDto = z.infer<typeof bookCreateDtoSchema>;

export type { BookCreateDto };
