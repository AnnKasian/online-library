import { create } from 'zustand';

import { createAppClient } from '#/providers/client';
import { BooksService } from '#/services/books';
import { CopiesService } from '#/services/copies';
import { UsersService } from '#/services/users';

const useServiceStore = create(() => {
  const apiClient = createAppClient();

  return {
    booksService: new BooksService(apiClient),
    usersService: new UsersService(apiClient),
    copiesService: new CopiesService(apiClient),
  };
});

export { useServiceStore };
