import { Prisma, PrismaClient } from '@prisma/client';

import { UserRole } from '@/packages/user';

const prisma = new PrismaClient();

const admin: Prisma.UserCreateInput = {
  fullName: 'Admin',
  dateOfBirth: new Date('2000/04/05'),
  email: 'admin@gmail.com',
  password: '12345678',
  role: UserRole.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
};

void prisma.user
  .upsert({
    where: {
      email: admin.email,
      password: admin.password,
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
