'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { OrderDetails } from '@/models/Order';
import { getOrder } from '@/utils/api';
import OrderContent from '@/components/orders/OrderContent';
import Loading from '@/components/loading/Loading';

export default function OrderDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/login?callbackUrl=/orders/${id}`);
    }
  });

  const [order, setOrder] = useState<OrderDetails>();

  useEffect(() => {
    getOrder(id)
      .then((order) => setOrder(order))
      .catch((error) => console.error(error));
  }, [id]);

  if (!order) {
    return <Loading />;
  }

  return (
    <OrderContent order={order} />
  )
}
