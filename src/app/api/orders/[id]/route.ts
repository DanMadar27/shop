import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '../../db/client';

import { validateSlug } from '../../validation/requests';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || typeof session.user?.email !== 'string') {
    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
  }

  const id = params.id;

  if (!validateSlug(id)) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      console.error('Error fetching user');
      return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        order_products: {
          include: {
            product: true,
          }
        }
      }
    });
    
    if (!order) {
      console.error('Order not found');
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    
    if (order.user_id !== user.id) {
      console.error('Order not belongs to user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // return in resopnse index of order based on user orders
    const index = await prisma.order.count({
      where: {
        user_id: user.id,
        created_at: {
          lt: order.created_at
        }
      }
    });

    const resopnse = {
      index: index + 1,
      ...order,
    }

    return NextResponse.json(resopnse);
  }
  catch (error) {
    console.error('Error fetching order', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } 
}