// import NextPage generic type
import { NextPage } from 'next';
import Link from 'next/link';

import ProductModel from '../../models/Product';
import ProductContent from './ProductContent';
import LikeButton from '../inputs/IconButtons/LikeButton';

import 'material-icons/iconfont/filled.css';

import {
  language,
  BUY_NOW,
} from '@/config/texts';

interface Props {
  product: ProductModel;
}

const ProductCard: NextPage<Props> = (props) => {
  const { product } = props;

  return (      
    <li className='card'>
      <ProductContent product={product} />
      <div className='buttons'>
        <Link href={`/products/${product.id}`}>
          {BUY_NOW[language]}
        </Link>
        <LikeButton product={product} />
      </div>
    </li>
  );
};

export default ProductCard;