import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

import CartHeader from '@/components/cart/CartHeader/CartHeader';
import CartContent from '@/components/cart/Cart/Cart';

import styles from './cart.module.css';

import {
  language,
  MY_CART,
} from '@/config/texts';

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/cart');
  }

  return (
    <div className={styles.container}>
      <CartHeader backLink={'/products'}/>
      <h1>{MY_CART[language]}</h1>
      <CartContent />
    </div>
  )
}
