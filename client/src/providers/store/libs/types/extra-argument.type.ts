import { NotificationsService } from '#/services/notification';
import { StorageService } from '#/services/storage';
import { UsersService } from '#/services/users';

type ExtraArgument = {
  storageService: StorageService;
  notificationService: NotificationsService;
  usersService: UsersService;
};

export type { ExtraArgument };
