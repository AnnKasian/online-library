import { StorageKeyValue } from './libs/enums';

class StorageService {
  private static instance: StorageService | null = null;

  private constructor(private storage: Storage) {}

  static getInstance(storage?: Storage): StorageService {
    if (!this.instance) {
      this.instance = new StorageService(storage ?? localStorage);
    } else if (storage) {
      this.instance.storage = storage;
    }

    return this.instance;
  }

  set(key: StorageKeyValue, value: string): void {
    this.storage.setItem(key, value);
  }

  get<T = string>(key: StorageKeyValue): T | null {
    const item = this.storage.getItem(key);

    return item ? (item as T) : null;
  }

  drop(key: StorageKeyValue): void {
    this.storage.removeItem(key);
  }
}

export { StorageService };
