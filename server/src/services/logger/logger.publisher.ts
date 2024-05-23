import { LoggerService } from './libs';

class LoggerPublisher implements LoggerService {
  private subscribers: LoggerService[];

  constructor(subscribers: LoggerService[] = []) {
    this.subscribers = subscribers;
  }

  subscribe(...subscribers: LoggerService[]) {
    this.subscribers.push(...subscribers);
  }

  unsubscribe(...subscribers: LoggerService[]) {
    this.subscribers = this.subscribers.filter((subscriber) =>
      subscribers.includes(subscriber),
    );
  }

  info(message: string): void {
    this.notify('info', message);
  }

  warn(message: string): void {
    this.notify('warn', message);
  }

  error(message: string): void {
    this.notify('error', message);
  }

  private notify(type: keyof LoggerService, message: string): void {
    this.subscribers.forEach((subscriber) => {
      subscriber[type](message);
    });
  }
}

export { LoggerPublisher };
