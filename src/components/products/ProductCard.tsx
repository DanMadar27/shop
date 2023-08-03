// import NextPage generic type
import { NextPage } from 'next';
import Link from 'next/link';

import ProductModel from '../../models/Product';
import ProductContent from './ProductContent';
import LikeButton from '../inputs/IconButtons/LikeButton';

import 'material-icons/iconfont/filled.css';

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
          SHOP NOW
        </Link>
        <LikeButton product={product} />
      </div>
    </li>
  );
};

export default ProductCard;