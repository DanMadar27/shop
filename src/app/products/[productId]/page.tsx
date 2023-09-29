'use client';

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/app/GlobalRedux/features/cart/cartSlice';

import Product from '@/models/Product';
import { initialProduct } from '@/models/Product';

import BackLink from '@/components/inputs/IconLinks/BackLink';
import ProductContent from '@/components/products/ProductContent';
import AddProductButton from '@/components/inputs/Products/AddProductButton';
import LikeButton from '@/components/inputs/IconButtons/LikeButton';

import styles from './product.module.css';
import 'material-icons/iconfont/filled.css';

import { getProduct } from '@/utils/api';

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const [product, setProduct] = useState<Product>(initialProduct);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    getProduct(productId)
      .then((product) => setProduct(product))
      .catch((error) => console.error(error));
  }, [productId]);

  const buyNow = () => {
    // @ts-ignore
    dispatch(addProduct(product));
    router.push('/cart');
  }

  return (
    <div className={styles.container}>
      <div>
        <BackLink link={'/products'} />
        <ProductContent product={product} />
        <LikeButton product={product} />
      </div>
      <div className='flex-column-between'>
        <button onClick={buyNow}>
          Buy Now
        </button>
        <AddProductButton product={product} />
      </div>
    </div>
  )
}
