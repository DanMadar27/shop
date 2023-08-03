'use client';

import { useState, useEffect } from 'react';

import Product from '@/models/Product';
import { initialProduct } from '@/models/Product';

import ProductContent from '@/components/products/ProductContent';
import LikeButton from '@/components/inputs/IconButtons/LikeButton';

import styles from './product.module.css';
import 'material-icons/iconfont/filled.css';

async function getProduct(productId: string): Promise<Product> {
  return {
    id: productId,
    name: 'Product Name',
    description: 'Product Description.',
    price: 9.99,
    isFavorite: false,
    amount: 0,
    image: '/vercel.svg'
  };
}

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    getProduct(productId).then((product) => setProduct(product));
  }, [productId]);

  return (
    <div className={styles.container}>
      <ProductContent product={product} />
      <div className='flex-column-between'>
        <button>BUY NOW</button>
        <button>ADD TO CART</button>
        <LikeButton product={product} />
      </div>
    </div>
  )
}
