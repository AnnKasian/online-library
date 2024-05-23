import { z } from 'zod';

import { configSchema } from '../schemas';

type ConfigSchema = z.infer<typeof configSchema>;

export type { ConfigSchema };
