import { PrismaClient } from '@prisma/client';
import { initData } from './data/utils';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  initData(prisma);
}
else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
    initData(globalWithPrisma.prisma);
  }
  
  prisma = globalWithPrisma.prisma;
}

export default prisma;
