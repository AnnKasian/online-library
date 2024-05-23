import { BookValidationRule } from './book-validation-rule.enum';

const BookValidationMessage = {
  TITLE_REQUIRED: 'Title is required.',
  TITLE_STRING: 'Title should be a string.',
  TITLE_LENGTH: `Title length should be at least this length: ${BookValidationRule.TITLE_LENGTH}.`,
  AUTHOR_REQUIRED: 'Author is required.',
  AUTHOR_STRING: 'Author should be a string.',
  AUTHOR_VALID: 'Author should be valid.',
  GENRE_REQUIRED: 'Genre is required.',
  GENRE_STRING: 'Genre should be a string.',
  GENRE_LENGTH: `Genre length should be at least this length: ${BookValidationRule.GENRE_LENGTH}.`,
  DESCRIPTION_STRING: 'Date should be a string.',
};

export { BookValidationMessage };
