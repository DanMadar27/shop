'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import useLoadOnScroll from '@/hooks/loadOnScroll';

import Order from '../../models/Order';
import { getOrders } from '@/utils/api';
import OrderList from '@/components/orders/OrderList';
import Loading from '@/components/loading/Loading';

import {
  language,
  ORDERS,
} from '@/config/texts';

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
    return <Loading />;
  }

  return (
    <div className='container'>
      <h1>{ORDERS[language]}</h1>
      <OrderList orders={orders} />
    </div>
  );
}