import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums';

const userUpdateDtoSchema = z
  .object({
    fullName: z
      .string({
        required_error: UserValidationMessage.FULL_NAME_REQUIRED,
        invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
      })
      .min(UserValidationRule.NAME_LENGTH, {
        message: UserValidationMessage.FULL_NAME_LENGTH,
      }),
    oldEmail: z
      .string({
        required_error: UserValidationMessage.FULL_NAME_REQUIRED,
        invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
      })
      .min(UserValidationRule.EMAIL_EMPTY, {
        message: UserValidationMessage.EMAIL_EMPTY,
      }),
    email: z
      .string({
        required_error: UserValidationMessage.FULL_NAME_REQUIRED,
        invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
      })
      .min(UserValidationRule.EMAIL_EMPTY, {
        message: UserValidationMessage.EMAIL_EMPTY,
      })
      .optional(),
    oldPassword: z
      .string({
        required_error: UserValidationMessage.FULL_NAME_REQUIRED,
        invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
      })
      .min(UserValidationRule.PASSWORD_EMPTY, {
        message: UserValidationMessage.PASSWORD_EMPTY,
      })
      .optional(),
    newPassword: z
      .string({
        required_error: UserValidationMessage.FULL_NAME_REQUIRED,
        invalid_type_error: UserValidationMessage.FULL_NAME_STRING,
      })
      .min(UserValidationRule.PASSWORD_EMPTY, {
        message: UserValidationMessage.PASSWORD_EMPTY,
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.oldPassword || data.newPassword) {
        return !!data.oldPassword && !!data.newPassword;
      }
      return true;
    },
    {
      message: UserValidationMessage.UPDATE_PASSWORD_REQUIRED,
      path: ['oldPassword'],
    },
  );

export { userUpdateDtoSchema };
