import { z } from 'zod';

import { userUpdateDtoSchema } from '../schemas';

type UserUpdateDto = z.infer<typeof userUpdateDtoSchema>;

export type { UserUpdateDto };
