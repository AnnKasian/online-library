import { z } from 'zod';

import { userSignInDtoSchema } from '../schemas';

type UserSignInDto = z.infer<typeof userSignInDtoSchema>;

export type { UserSignInDto };
