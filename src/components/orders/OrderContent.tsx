import React from 'react'
import Link from 'next/link';
import { OrderDetails } from '@/models/Order'
import styles from './Order.module.css';

interface Props {
  order: OrderDetails
}

export default function OrderContent({ order }: Props) {
  return (
    <div className={styles.order}>
      <h1>Order {order.index}</h1>
      <p><b>Total:</b> {order.total_amount}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Created:</b> {new Date(order.created_at).toDateString()}</p>
      <h2>Products</h2>
      <ul>
        {order.order_products.map((order_product) => (
          <li key={order_product.id}>
            <Link href={`/products/${order_product.product.id}`}>
              <img
                src={order_product.product.image}
                alt={order_product.product.name}
                width={200}
                height={200}
              />
            </Link>
            <Link href={`/products/${order_product.product.id}`}>
              <p>{order_product.product.name}</p>
            </Link>
            <p><b>Price:</b> {order_product.product.price}</p>
            <p><b>Quantity:</b> {order_product.quantity}</p>
            <p><b>Subtotal:</b> {order_product.subtotal}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
