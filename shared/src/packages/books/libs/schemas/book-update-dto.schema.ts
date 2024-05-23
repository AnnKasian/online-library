import { bookCreateDtoSchema } from './book-create-dto.schema';

const bookUpdateDtoSchema = bookCreateDtoSchema.partial();

export { bookUpdateDtoSchema };
