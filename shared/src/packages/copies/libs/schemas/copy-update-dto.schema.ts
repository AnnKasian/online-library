import { z } from 'zod';

import { CopyValidationMessage } from '../enums';

const copyUpdateDtoSchema = z.object({
  bookId: z.number({
    required_error: CopyValidationMessage.REQUIRED,
    invalid_type_error: CopyValidationMessage.NUMBER,
  }),
});

export { copyUpdateDtoSchema };
