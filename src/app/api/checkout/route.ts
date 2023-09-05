import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

import prisma from '../db/client';
import { Product } from '@prisma/client';

type ProductInput = {
  id: number;
  quantity: number;
};

async function validateRequest(request: Request) {
  try {
    const productsInput: ProductInput[] = await request.json();

    if (!productsInput || !Array.isArray(productsInput)) {
      console.error('Invalid products input');
      return null;
    }

    const productIds = productsInput.map((product: ProductInput) => product.id);

    const products: Product[] = await prisma.product.findMany({
      where: {
        id: { in: productIds }
      },
    });
  
    if (products.length !== productIds.length) {
      console.error('One or more products are invalid or do not exist');
      return null;
    }
    
    for (let i = 0; i < productsInput.length; i++) {
      if (!productsInput[i].quantity || productsInput[i].quantity < 1) {
        console.error('One or more products have invalid quantity');
        return null;
      }

      productsInput[i].quantity = Math.floor(productsInput[i].quantity);
    }

    const productsWithPrice = products.map((product: Product) => {
      const quantity = productsInput.find(
        (productInput: ProductInput) => productInput.id === product.id
      )?.quantity || 0;

      if (!quantity) {
        console.error('No quantity found for product : ', product.id);
      }

      return {
        ...product,
        quantity,
        price: product.price * quantity,
      };
    });

    return productsWithPrice;
  }
  catch (error) {
    console.error('Error validating request : ', error);
    return null;
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
  }
  
  // TODO: Get user id from session using session.user.email
  const userId = 1; // mock user
  const products = await validateRequest(request);

  if (!products) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    // Use transaction to ensure that order and order products are created together
    const order = await prisma.$transaction(async (transactionPrisma) => {
        const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
        
        const order = await transactionPrisma.order.create({
          data: {
            user_id: userId,
            total_amount: totalAmount,
          },
        });

        const orderProductsData = products.map(product => {
          return {
            order_id: order.id,
            product_id: product.id,
            quantity: product.quantity,
            subtotal: product.price,
          }
        });
       
        await transactionPrisma.orderProduct.createMany({
          data: orderProductsData,
        });
      
        console.log('Order created : ', order.id);
        
        return order;
    });

    return NextResponse.json({ order });
  }
  catch (error) {
    console.error('Error creating order : ', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}