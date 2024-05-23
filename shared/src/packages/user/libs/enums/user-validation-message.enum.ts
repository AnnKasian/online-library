import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  FULL_NAME_REQUIRED: 'Name is required.',
  FULL_NAME_STRING: 'Name should be a string.',
  FULL_NAME_LENGTH: `Name length should be at least this length: ${UserValidationRule.NAME_LENGTH}.`,
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_STRING: 'Email should be a string.',
  EMAIL_VALID: 'Email should be valid.',
  EMAIL_EMPTY: 'Email should not be empty.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_STRING: 'Password should be a string.',
  PASSWORD_LENGTH: `Password length should be at least this length: ${UserValidationRule.PASSWORD_LENGTH}.`,
  PASSWORD_EMPTY: 'Password should not be empty.',
  DATE_REQUIRED: 'Date is required',
  DATE_STRING: 'Date should be a string.',
  DATE_VALID: 'Date cannot be from the future.',
};

export { UserValidationMessage };
