import { NextResponse } from 'next/server'
import prisma from '../../db/client';

import mockProducts from './config';

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const products = await prisma.product.createMany({
        data: mockProducts,
    });

    const response = {
      products: mockProducts,
      count: products.count,
    }

    return NextResponse.json(response);
  }
  catch (error) {
    console.error('Error creating products : ', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}