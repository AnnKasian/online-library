import { z } from 'zod';

import { idDtoSchema } from '../schemas';

type IdDto = z.infer<typeof idDtoSchema>;

export type { IdDto };
