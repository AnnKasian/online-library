import { BookDto } from '#/packages/books';
import { UserDto } from '#/packages/user';

type CopyExtendedDto = {
  id: number;
  book: BookDto;
  user?: UserDto;
  returnedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type { CopyExtendedDto };
