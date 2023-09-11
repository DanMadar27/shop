import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '../db/client';

type OrdersQuery = {
  skip?: number;
  take?: number;
  where: {
    user_id: number;
  },
};

function validateRequest(skip: string, take: string) {
  if (isNaN(parseInt(skip)) || isNaN(parseInt(take))) {
    return false;
  }

  return true;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || typeof session.user?.email !== 'string') {
    return NextResponse.json({ error: 'You are not logged in' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const skip = searchParams.get('skip') || '0';
  const take = searchParams.get('take') || '10';

  if (!validateRequest(skip, take)) {
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

    const query: OrdersQuery = {
      skip: parseInt(skip),
      take: parseInt(take),
      where: {
        user_id: user.id,
      },
    };  
    
    const orders = await prisma.order.findMany(query);
    const response = orders.map((order, index) => ({
      index: index + parseInt(skip) + 1,
      ...order,
      link: `/orders/${order.id}`,
    }));

    return NextResponse.json(response) 
  }
  catch (error) {
    console.error('Error fetching orders', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}