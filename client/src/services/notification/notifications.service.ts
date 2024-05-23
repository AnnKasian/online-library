import { NotificationInvoker } from './libs/types';

class NotificationsService {
  private static instance: NotificationsService | null = null;

  private constructor(private invoker: NotificationInvoker) {}

  static getInstance(invoker?: NotificationInvoker): NotificationsService {
    if (!this.instance) {
      this.instance = new NotificationsService(invoker ?? {});
    } else if (invoker) {
      this.instance.invoker = invoker;
    }

    return this.instance;
  }

  showInfo(message: string) {
    this.invoker.info?.(message);
  }

  showSuccess(message: string) {
    this.invoker.success?.(message);
  }

  showWarning(message: string) {
    this.invoker.warn?.(message);
  }

  showError(message: string) {
    this.invoker.error?.(message);
  }
}

export { NotificationsService };
