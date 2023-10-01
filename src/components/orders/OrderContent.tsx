import React from 'react'
import Link from 'next/link';

import BackLink from '../inputs/IconLinks/BackLink';

import { OrderDetails } from '@/models/Order'

import styles from './Order.module.css';

import {
  language,
  ORDER,
  TOTAL,
  STATUS,
  DATE,
  PRODUCTS,
  PRICE,
  QUANTITY,
  SUBTOTAL,
} from '@/config/texts';

interface Props {
  order: OrderDetails
}

export default function OrderContent({ order }: Props) {
  return (
    <div className={styles.order}>
      <div>
        <BackLink link={'/orders'} />
        <h1>{`${ORDER[language]} ${order.index}`}</h1>
        <p><b>{`${TOTAL[language]}: `}</b> {order.total_amount}</p>
        <p><b>{`${STATUS[language]}: `}</b> {order.status}</p>
        <p><b>{`${DATE[language]}: `}</b> {new Date(order.created_at).toDateString()}</p>
      </div>
      <div>
        <h2>{PRODUCTS[language]}</h2>
        <ul>
          {order.order_products.map((order_product) => (
            <li key={order_product.id}>
              <Link href={`/products/${order_product.product.id}`}>
                <img
                  src={order_product.product.image}
                  alt={order_product.product.name}
                />
              </Link>
              <Link href={`/products/${order_product.product.id}`}>
                <p>{order_product.product.name}</p>
              </Link>
              <p><b>{`${PRICE[language]}: `}</b> {order_product.product.price}</p>
              <p><b>{`${QUANTITY[language]}: `}</b> {order_product.quantity}</p>
              <p><b>{`${SUBTOTAL[language]}: `}</b> {order_product.subtotal}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
