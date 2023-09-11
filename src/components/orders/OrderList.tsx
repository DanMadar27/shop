import { NextPage } from 'next';
import Link from 'next/link';

import OrderModel from '../../models/Order';

interface Props {
  orders: OrderModel[];
}

const OrderList: NextPage<Props> = (props) => {
  const { orders } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>Order</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>
            <Link href={`/orders/${order.id}`}>
              Order {order.index}
            </Link>
          </td>
          <td>{parseFloat(order.total_amount.toFixed(2))}</td>
          <td>{order.status}</td>
          <td>{new Date(order.created_at).toDateString()}</td>
        </tr>
      ))}
    </table>
  );
};

export default OrderList;