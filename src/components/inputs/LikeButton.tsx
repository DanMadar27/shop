import React from 'react';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../app/GlobalRedux/features/products/productSlice';

import Product from '@/models/Product';

import 'material-icons/iconfont/filled.css';


interface Props {
  product: Product;
}

function favoriteIcon(isFavorite: boolean) {
  if (isFavorite) {
    return <span className='material-icons'>favorite</span>;
  }

  return <span className='material-icons'>favorite_border</span>;
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
    <button className='icon-button' onClick={toggleFavorite}>
      {favoriteIcon(product.isFavorite)}
    </button>
  );
};

export default LikeButton;
