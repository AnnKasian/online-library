import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums';

const userSignInDtoSchema = z.object({
  email: z
    .string({
      required_error: UserValidationMessage.FULL_NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
    })
    .min(UserValidationRule.EMAIL_EMPTY, {
      message: UserValidationMessage.EMAIL_EMPTY,
    }),
  password: z
    .string({
      required_error: UserValidationMessage.FULL_NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
    })
    .min(UserValidationRule.PASSWORD_EMPTY, {
      message: UserValidationMessage.PASSWORD_EMPTY,
    }),
});

export { userSignInDtoSchema };
