'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import Order from '../../models/Order';
import { getOrders } from '@/utils/api';
import OrderList from '@/components/orders/OrderList';

export default function Orders() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login?callbackUrl=/orders');
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    getOrders(0, 10).then((orders) => {
      setOrders(orders);
    })
    .catch((error) => {
      console.error(error);
    });
  
    return () => {
      setOrders([]);
    }
  }, [])

  return (
    <div>
      <h1>Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
}