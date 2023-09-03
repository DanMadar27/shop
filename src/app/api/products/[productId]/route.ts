import { NextResponse } from 'next/server'
import prisma from '../../db/client';

function validateRequest(productId: string) {
  return !isNaN(parseInt(productId));
}

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  const productId = params.productId;

  if (!validateRequest(productId)) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId)
      }
    });
    
    if (!product) {
      console.error('Product not found');
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  }
  catch (error) {
    console.error('Error fetching product', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } 
}