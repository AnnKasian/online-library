import { configSchema } from './libs/schemas';
import { ConfigSchema } from './libs/types';

class ConfigService {
  readonly schema: ConfigSchema;
  private static service?: ConfigService;

  private constructor() {
    this.schema = configSchema.parse({
      app: {
        port: process.env['PORT'],
        prefixGlobal: process.env['PREFIX_GLOBAL'],
      },
      database: {
        username: process.env['DB_USERNAME'],
        password: process.env['DB_PASSWORD'],
        port: process.env['DB_PORT'],
        name: process.env['DB_NAME'],
        host: process.env['DB_HOST'],
        url: process.env['DB_URL'],
      },
      encrypt: {
        rounds: process.env['ENCRYPT_ROUNDS'],
      },
    });
  }

  static get instance() {
    if (!this.service) {
      this.service = new ConfigService();
    }

    return this.service;
  }
}

export { ConfigService };
