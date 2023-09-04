import React from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '@/app/GlobalRedux/features/cart/cartSlice';

import Product from '@/models/Product';

import CounterButton from '../IconButtons/CounterButton';

interface Props {
  product: Product;
}

const ChangeProductQuantity: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const increaseQuantity = async () => {
    // @ts-ignore
    dispatch(changeQuantity({ product, quantity: product.quantity + 1 }));
  }

  const decreaseQuantity = async () => {
    // @ts-ignore
    dispatch(changeQuantity({ product, quantity: product.quantity - 1 }));
  }
  
  return (
    <CounterButton
      value={product.quantity}
      increase={increaseQuantity}
      decrease={decreaseQuantity}
    />
  );
};

export default ChangeProductQuantity;
