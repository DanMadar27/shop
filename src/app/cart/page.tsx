'use client';

import ButtonsHeader from '@/components/inputs/ButtonsHeader/ButtonsHeader';
import CartContent from '@/components/cart/Cart';

import styles from './cart.module.css';

// Mock data.
const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 description. more mock description',
    price: 100,
    isFavorite: false,
    amount: 3,
    image: '/vercel.svg'
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Product 2 description',
    price: 150,
    isFavorite: false,
    amount: 2,
    image: '/vercel.svg'
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Product 3 description',
    price: 200,
    isFavorite: true,
    amount: 1,
    image: '/vercel.svg'
  }
];

export default function Cart() {

  return (
    <div className={styles.container}>
      <ButtonsHeader backLink={'/products'}/>
      <h1>My Cart</h1>
      <CartContent products={products} />
    </div>
  )
}
