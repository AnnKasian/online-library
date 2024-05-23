type NotificationInvoker = {
  info?: (message: string) => void;
  success?: (message: string) => void;
  warn?: (message: string) => void;
  error?: (message: string) => void;
};

export type { NotificationInvoker };
