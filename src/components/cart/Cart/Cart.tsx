'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { emptyCart} from '@/app/GlobalRedux/features/cart/cartSlice';

import CartList from '../CartList';
import Loading from '@/components/loading/Loading';

import styles from './cart.module.css';

import { checkout } from '@/utils/api';

import {
  language,
  DELIVERY,
  TOTAL,
  CHECKOUT,
  FREE,
} from '@/config/texts';

const CartContent: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.value);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (products.length) {
      const totalPrice = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);

      setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    }
    else {
      setTotalPrice(0);
    }
  }, [products]);

  const handleCheckout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const body = products.map(product => {
        return {
          id: product.id,
          quantity: product.quantity,
        }
      });

      await checkout(body);
      alert('Checkout completed successfully');

      dispatch(emptyCart());
      router.push('/orders');      
    }
    catch (error) {
      console.error(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <CartList products={products} />
      <div className={styles.checkout}>
        <p>{`${TOTAL[language]}: `}<b>${totalPrice}</b></p>
        <p>{`${DELIVERY[language]}: `}<b>{FREE[language]}</b></p>
        <button disabled={loading || !products.length} onClick={handleCheckout}>
          {CHECKOUT[language]}
        </button>
      </div>
    </div>
  );
};

export default CartContent;
