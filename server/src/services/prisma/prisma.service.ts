import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  private static service?: PrismaService;

  private constructor() {
    super();
  }

  static get instance() {
    if (!this.service) {
      this.service = new PrismaService();
    }

    return this.service;
  }

  static async connect() {
    await this.instance.$connect();
  }
}
