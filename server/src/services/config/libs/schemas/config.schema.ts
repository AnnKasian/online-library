import { z } from 'zod';

const configSchema = z.object({
  app: z.object({
    port: z.coerce.number(),
    prefixGlobal: z.string(),
  }),
  database: z.object({
    username: z.string(),
    password: z.string(),
    port: z.coerce.number(),
    name: z.string(),
    host: z.string(),
    url: z.string(),
  }),
  encrypt: z.object({
    rounds: z.coerce.number(),
  }),
});

export { configSchema };
