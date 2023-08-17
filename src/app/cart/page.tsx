'use client';

import { RootState } from '../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, changeAmount} from '../GlobalRedux/features/cart/cartSlice';

import CartHeader from '@/components/cart/CartHeader/CartHeader';
import CartContent from '@/components/cart/Cart/Cart';

import styles from './cart.module.css';

export default function Cart() {
  const products = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <CartHeader backLink={'/products'}/>
      <h1>My Cart</h1>
      <CartContent products={products} />
    </div>
  )
}
