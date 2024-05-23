import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums';

const userSignUpDtoSchema = z.object({
  email: z
    .string({
      required_error: UserValidationMessage.FULL_NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
    })
    .email({ message: UserValidationMessage.EMAIL_VALID }),
  password: z
    .string({
      required_error: UserValidationMessage.FULL_NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
    })
    .min(UserValidationRule.PASSWORD_LENGTH, {
      message: UserValidationMessage.PASSWORD_LENGTH,
    }),
  fullName: z
    .string({
      required_error: UserValidationMessage.FULL_NAME_REQUIRED,
      invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
    })
    .min(UserValidationRule.NAME_LENGTH, {
      message: UserValidationMessage.FULL_NAME_LENGTH,
    }),
  dateOfBirth: z.coerce
    .date({
      required_error: UserValidationMessage.DATE_REQUIRED,
      invalid_type_error: UserValidationMessage.DATE_STRING,
    })
    .max(new Date(), { message: UserValidationMessage.DATE_VALID }),
});

export { userSignUpDtoSchema };
