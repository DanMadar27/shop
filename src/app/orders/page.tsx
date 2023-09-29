'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import useLoadOnScroll from '@/hooks/loadOnScroll';

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

  const { loading } = useLoadOnScroll({
    data: orders,
    setData: setOrders,
    apiFunction: getOrders,
    take: 30,
    searchEnabled: false,
  });

  if (loading && !orders.length) {
    return <div>Loading...</div>
  }

  return (
    <div className='container'>
      <h1>Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
}