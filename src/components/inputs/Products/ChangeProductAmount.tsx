import React from 'react';
import { useDispatch } from 'react-redux';
import { changeAmount } from '@/app/GlobalRedux/features/cart/cartSlice';

import Product from '@/models/Product';

import CounterButton from '../IconButtons/CounterButton';

interface Props {
  product: Product;
}

const ChangeProductAmount: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const increaseAmount = async () => {
    // @ts-ignore
    dispatch(changeAmount({ product, amount: product.amount + 1 }));
  }

  const decreaseAmount = async () => {
    // @ts-ignore
    dispatch(changeAmount({ product, amount: product.amount - 1 }));
  }
  
  return (
    <CounterButton
      value={product.amount}
      increase={increaseAmount}
      decrease={decreaseAmount}
    />
  );
};

export default ChangeProductAmount;
