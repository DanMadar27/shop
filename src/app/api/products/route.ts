import { NextResponse } from 'next/server'
import prisma from '../db/client';

type ProductsQuery = {
  skip?: number;
  take?: number;
  where?: {
    OR?: object[];
  };
};

function validateRequest(skip: string, take: string, search: string) {
  if (isNaN(parseInt(skip)) || isNaN(parseInt(take))) {
    return false;
  }

  return true;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = searchParams.get('skip') || '0';
  const take = searchParams.get('take') || '10';
  const search = searchParams.get('search') || '';

  if (!validateRequest(skip, take, search)) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const query: ProductsQuery = {
    skip: parseInt(skip),
    take: parseInt(take),
  };  

  if (search) {
    query.where = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive', // Perform case-insensitive search
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive', // Perform case-insensitive search
          },
        },
      ],
    };
  }
  
  try {
    const products = await prisma.product.findMany(query);
    const response = products.map((product) => ({
      ...product,
      isFavorite: false,
      quantity: 0,
    }));

    return NextResponse.json(response) 
  }
  catch (error) {
    console.error('Error fetching products', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}