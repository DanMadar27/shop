import React from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../../app/GlobalRedux/features/products/productSlice';

import Product from '@/models/Product';

import IconButton from './IconButton';

interface Props {
  product: Product;
}

function favoriteIcon(isFavorite: boolean): string {
  return isFavorite ? 'favorite' : 'favorite_border';
}

const LikeButton: React.FC<Props> = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const toggleFavorite = async () => {
    const newProduct = { ...product };
    newProduct.isFavorite = !newProduct.isFavorite;
    
    // @ts-ignore. This is a redux action
    dispatch(setProduct(newProduct));
  }

  return (
    <IconButton icon={favoriteIcon(product.isFavorite)} onClick={toggleFavorite} />
  );
};

export default LikeButton;
