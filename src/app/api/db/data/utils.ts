import { PrismaClient } from '@prisma/client';
import initProducts from './products';

export async function initData(prisma: PrismaClient) {
  try {
    if (!await isInitData(prisma)) {
      await createInitData(prisma);
    }
  } catch (error) {
    console.error(error);
  }
}

async function isInitData(prisma: PrismaClient) {
  if (!await productsExist(prisma)) {
    return false;
  }

  return true;
}

async function createInitData(prisma: PrismaClient) {
  console.log('Creating initial data');

  await Promise.all([
    createProducts(prisma),
  ]);

  console.log('Initial data created');
}

async function productsExist(prisma: PrismaClient) {
  const products = await prisma.product.findMany();
  return products.length > 0;
}

async function createProducts(prisma: PrismaClient) {
  await prisma.product.createMany({
    data: initProducts,
  });

  console.log('Products created');
}
