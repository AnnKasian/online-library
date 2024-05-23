import { z } from 'zod';

import { userSignUpDtoSchema } from '../schemas';

type UserSignUpDto = z.infer<typeof userSignUpDtoSchema>;

export type { UserSignUpDto };
