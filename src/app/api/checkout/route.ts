import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

import prisma from '../db/client';
import { validateCheckoutRequest } from '../validation/orders';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || typeof session.user?.email !== 'string') {
    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
  }
  
  const products = await validateCheckoutRequest(request);

  if (!products) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      console.error('Error fetching user');
      return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
  
    // Use transaction to ensure that order and order products are created together
    const order = await prisma.$transaction(async (transactionPrisma) => {
        const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
        
        const order = await transactionPrisma.order.create({
          data: {
            user_id: user.id,
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
      
        console.log(`Order ${order.id} created for user ${user.email}`);
        
        return order;
    });

    return NextResponse.json({ order });
  }
  catch (error) {
    console.error('Error creating order : ', error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}