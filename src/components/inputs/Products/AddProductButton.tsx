import React from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '@/app/GlobalRedux/features/products/productSlice';
import { addProduct } from '@/app/GlobalRedux/features/cart/cartSlice';

import Product from '@/models/Product';

import {
  language,
  ADD_TO_CART,
} from '@/config/texts';

interface Props {
  product: Product;
}

const AddProductButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = async () => {
    // @ts-ignore. This is a redux action
    dispatch(setProduct({...product, quantity: 1}));

    // @ts-ignore. This is a redux action
    dispatch(addProduct(product));
  }
  
  return (
    <button onClick={addToCart}>
      {ADD_TO_CART[language]}
    </button>
  );
};

export default AddProductButton;
