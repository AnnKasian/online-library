import { z } from 'zod';

import { BookValidationMessage, BookValidationRule } from '../enums';

const bookCreateDtoSchema = z.object({
  title: z
    .string({
      required_error: BookValidationMessage.TITLE_REQUIRED,
      invalid_type_error: BookValidationMessage.GENRE_STRING,
    })
    .min(BookValidationRule.TITLE_LENGTH, {
      message: BookValidationMessage.TITLE_LENGTH,
    }),
  author: z
    .string({
      required_error: BookValidationMessage.AUTHOR_REQUIRED,
      invalid_type_error: BookValidationMessage.AUTHOR_STRING,
    })
    .min(BookValidationRule.AUTHOR_LENGTH, {
      message: BookValidationMessage.AUTHOR_VALID,
    }),
  genre: z
    .string({
      required_error: BookValidationMessage.GENRE_REQUIRED,
      invalid_type_error: BookValidationMessage.GENRE_STRING,
    })
    .min(BookValidationRule.GENRE_LENGTH, {
      message: BookValidationMessage.GENRE_LENGTH,
    }),
  description: z.string({
    invalid_type_error: BookValidationMessage.DESCRIPTION_STRING,
  }),
});

export { bookCreateDtoSchema };
