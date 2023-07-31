'use client';

import { RootState } from '../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../GlobalRedux/features/products/productSlice';

import { useState, useEffect } from 'react';
import useSWR from 'swr';

import ImageSlider from '../../components/catalog/ImageSlider';
import Products from '../../components/products/Products';
import Wishlist from '../../components/modals/Wishlist';

import styles from './products.module.css';

import Product from '../../models/Product';
import CartModal from '@/components/modals/CartModal';

const catalogImages = [
  '/next.svg',
  '/vercel.svg',
]

async function getProducts(): Promise<Product[]> {
  // return mock data. In the future, this will be an API call and use SWR
  return [
    {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description. more mock description',
      price: 100,
      isFavorite: false,
      amount: 3,
      image: '/vercel.svg'
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 150,
      isFavorite: false,
      amount: 2,
      image: '/vercel.svg'
    },
    {
      id: '3',
      name: 'Product 3',
      description: 'Product 3 description',
      price: 200,
      isFavorite: true,
      amount: 1,
      image: '/vercel.svg'
    },
    {
      id: '4',
      name: 'Product 4',
      description: 'Product 4 description',
      price: 100,
      isFavorite: true,
      amount: 0,
      image: '/vercel.svg'
    },
    {
      id: '5',
      name: 'Product 5',
      description: 'Product 5 description',
      price: 100,
      isFavorite: true,
      amount: 0,
      image: '/vercel.svg'
    },
    {
      id: '6',
      name: 'Product 6',
      description: 'Product 6 description',
      price: 100,
      isFavorite: false,
      amount: 0,
      image: '/vercel.svg'
    },
    {
      id: '7',
      name: 'Product 7',
      description: 'Product 7 description',
      price: 100,
      isFavorite: false,
      amount: 0,
      image: '/vercel.svg'
    },
    {
      id: '8',
      name: 'Product 8',
      description: 'Product 8 description',
      price: 100,
      isFavorite: false,
      amount: 0,
      image: '/vercel.svg'
    },
  ]
}

export default function Home() {
  const { data, error } = useSWR<Product[]>('/api/products', getProducts);
  const products = useSelector((state: RootState) => state.products.value);
  
  const dispatch = useDispatch();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      // @ts-ignore. This is a redux action
      dispatch(setProducts(data));
    }
    return () => {
      // @ts-ignore. This is a redux action
      dispatch(setProducts([]));
    }
  }, [data]);

  const openWishlist = () => {
    setIsWishlistOpen(true);
  }

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  }

  const openCartModal = () => {
    setIsCartModalOpen(true);
  }

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  }

  if (!data) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* here put shop logo */}
        <img
          src='/next.svg'
          alt='Shop Logo'
          width={200}
          height={200}
        />
        <h1>Shop</h1>
      </div>
      <div className={styles.catalog}>
        <ImageSlider images={catalogImages}/>
      </div>
      <button onClick={openWishlist}>Open Wishlist</button>
      <Wishlist
        isOpen={isWishlistOpen} 
        onClose={closeWishlist} 
        products={products.filter(p => p.isFavorite)}
      />
      <button onClick={openCartModal}>Open Cart</button>
      <CartModal
        isOpen={isCartModalOpen} 
        onClose={closeCartModal} 
        products={products.filter(p => p.amount)}
      />
      <Products products={products} />
    </div>
  );
}