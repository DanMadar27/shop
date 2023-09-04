'use client';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { emptyCart} from '@/app/GlobalRedux/features/cart/cartSlice';

import CartList from '../CartList';

import styles from './cart.module.css';

import { checkout } from '@/utils/api';

const CartContent: React.FC = () => {
  const products = useSelector((state: RootState) => state.cart.value);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length) {
      const totalPrice = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
      }, 0);

      setTotalPrice(totalPrice);
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
      setLoading(false);

      // In the future redirect to the orders page
    }
    catch (error) {
      console.error(error);
      setLoading(false);
      alert('Something went wrong');
    }
  };

  return (
    <div>
      <CartList products={products} />
      <div className={styles.checkout}>
        <p>Total: <b>${totalPrice}</b></p>
        <p>Delivery: <b>Free</b></p>
        <button disabled={loading} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartContent;
