import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '@/app/GlobalRedux/features/cart/cartSlice';

import Product from '@/models/Product';

import RemoveButton from '../IconButtons/RemoveButton';

interface Props {
  product: Product;
}

const RemoveProductButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const callRemoveProduct = async () => {
    // @ts-ignore. This is a redux action
    dispatch(removeProduct(product));
  }
  
  return (
    <RemoveButton onClick={callRemoveProduct} />
  );
};

export default RemoveProductButton;
