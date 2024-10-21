import { BookDto } from '../../../books';
import { UserDto } from '../../../user';

type CopyExtendedDto = {
  id: number;
  book: BookDto;
  user?: UserDto;
  returnedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type { CopyExtendedDto };
