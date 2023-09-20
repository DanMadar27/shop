import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '@/app/GlobalRedux/features/cart/cartSlice';
import { setProduct } from '@/app/GlobalRedux/features/products/productSlice';

import Product from '@/models/Product';

import RemoveButton from '../IconButtons/RemoveButton';

interface Props {
  product: Product;
}

const RemoveProductButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const callRemoveProduct = async () => {
    if (product.quantity || product.isFavorite) {
      // @ts-ignore. This is a redux action
      dispatch(setProduct({...product, quantity: 0, isFavorite: false}));
    }

    // @ts-ignore. This is a redux action
    dispatch(removeProduct(product));
  }
  
  return (
    <RemoveButton onClick={callRemoveProduct} />
  );
};

export default RemoveProductButton;
