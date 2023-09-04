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

async function getProduct(productId: string): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${productId}`);
    const product: Product = await response.json();
    return product;
  }
  catch (error) {
    console.error(error);
    return initialProduct;
  }
}

export default function ProductDetails({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const [product, setProduct] = useState<Product>(initialProduct);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    getProduct(productId).then((product) => setProduct(product));
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
      </div>
      <div className='flex-column-between'>
        <button onClick={buyNow}>
          Buy Now
        </button>
        <AddProductButton product={product} />
        <LikeButton product={product} />
      </div>
    </div>
  )
}
