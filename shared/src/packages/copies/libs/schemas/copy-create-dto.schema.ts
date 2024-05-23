import { z } from 'zod';

import { CopyValidationMessage } from '../enums';

const copyCreateDtoSchema = z.object({
  amount: z.number({
    required_error: CopyValidationMessage.REQUIRED,
    invalid_type_error: CopyValidationMessage.NUMBER,
  }),
  bookId: z.number({
    required_error: CopyValidationMessage.REQUIRED,
    invalid_type_error: CopyValidationMessage.NUMBER,
  }),
});

export { copyCreateDtoSchema };
