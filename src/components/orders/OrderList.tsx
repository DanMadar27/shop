import { NextPage } from 'next';
import Link from 'next/link';

import OrderModel from '../../models/Order';

import {
  language,
  ORDER,
  TOTAL,
  STATUS,
  DATE,
} from '@/config/texts';

interface Props {
  orders: OrderModel[];
}

const OrderList: NextPage<Props> = (props) => {
  const { orders } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>{ORDER[language]}</th>
          <th>{TOTAL[language]}</th>
          <th>{STATUS[language]}</th>
          <th>{DATE[language]}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <Link href={`/orders/${order.id}`}>
                {`${ORDER[language]} ${order.index}`}
              </Link>
            </td>
            <td>{parseFloat(order.total_amount.toFixed(2))}</td>
            <td>{order.status}</td>
            <td>{new Date(order.created_at).toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;