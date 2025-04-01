import { apiClient } from '#/providers/client';
import { BooksService } from '#/services/books';
import { CopiesService } from '#/services/copies';
import { UsersService } from '#/services/users';

const booksService = new BooksService(apiClient);
const usersService = new UsersService(apiClient);
const copiesService = new CopiesService(apiClient);

export { booksService, usersService, copiesService };
