import { z } from 'zod';

import { ValidationMessage } from '../enums';

const idDtoSchema = z.object({
  id: z.coerce
    .number({
      required_error: ValidationMessage.ID_REQUIRED,
      invalid_type_error: ValidationMessage.ID_NUMBER,
    })
    .positive({ message: ValidationMessage.ID_POSITIVE }),
});

export { idDtoSchema };
