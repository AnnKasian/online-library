import { Prisma, PrismaClient } from '@prisma/client';

import { UserRole } from '@/packages/user';

import { EncryptService } from '#/services/encrypt';

const prisma = new PrismaClient();
const rounds = Number(process.env['ENCRYPT_ROUNDS']);
const salt = await EncryptService.generateSalt(rounds);
const password = await EncryptService.generateHash('12345678', salt);

const admin: Prisma.UserCreateInput = {
  fullName: 'Admin',
  dateOfBirth: new Date('2000/04/05'),
  email: 'admin@gmail.com',
  password: password,
  role: UserRole.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
};

void prisma.user
  .upsert({
    where: {
      email: admin.email,
    },
    create: {
      fullName: admin.fullName,
      dateOfBirth: admin.dateOfBirth,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    },
    update: {
      fullName: admin.fullName,
      email: admin.email,
      password: admin.password,
      updatedAt: admin.updatedAt,
    },
  })
  .catch((error: Error) => {
    console.error('Seeding is failed: ', error.stack);
  });
