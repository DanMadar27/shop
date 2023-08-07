'use client';

import { useRouter } from 'next/navigation'

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct, changeAmount} from '@/app/GlobalRedux/features/cart/cartSlice';

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

  const addToCart = () => {
    // @ts-ignore. This is a redux action
    dispatch(addProduct(product));
  }

  return (
    <div className={styles.container}>
      <ProductContent product={product} />
      <div className='flex-column-between'>
        <button onClick={buyNow}>
          Buy Now
        </button>
        {/* here use add to cart reducer */}
        <button onClick={addToCart}>
          Add To Cart
        </button>
        <LikeButton product={product} />
      </div>
    </div>
  )
}
