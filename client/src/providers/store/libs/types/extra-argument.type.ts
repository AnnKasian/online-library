import { BooksService } from '#/services/books';
import { CopiesService } from '#/services/copies';
import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';
import { UsersService } from '#/services/users';

type ExtraArgument = {
  storageService: StorageService;
  notificationService: NotificationsService;
  usersService: UsersService;
  booksService: BooksService;
  copiesService: CopiesService;
};

export type { ExtraArgument };
