'use client';

import { RootState } from '../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../GlobalRedux/features/products/productSlice';

import { useState, useEffect } from 'react';
import useLoadOnScroll from '@/hooks/loadOnScroll';

import ImageSlider from '../../components/catalog/ImageSlider';
import SearchBar from '../../components/inputs/SearchBar/SearchBar';
import Products from '../../components/products/Products';
import Wishlist from '../../components/modals/Wishlist';

import styles from './products.module.css';

import CartModal from '@/components/modals/CartModal';

import { getProducts } from '@/utils/api';
import { validateSearch } from '@/utils/validation';

const catalogImages = [
  '/next.svg',
  '/vercel.svg',
]

export default function Home() {
  const products = useSelector((state: RootState) => state.products.value);

  const { handleSearch } = useLoadOnScroll({
    data: products,
    setData: (products) => {
      // @ts-ignore
      dispatch(setProducts(products));
    },
    apiFunction: getProducts,
    take: 10,
    searchEnabled: true,
  });

  const dispatch = useDispatch();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Start Modals //
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
  // End Modals //

  return (
    <div className={styles.container}>
      <div className={styles.catalog}>
        <ImageSlider images={catalogImages}/>
      </div>
      <div className={styles['modal-buttons']}>
        <button onClick={openWishlist}>Open Wishlist</button>
        <button onClick={openCartModal}>Open Cart</button>
      </div>
      <Wishlist
        isOpen={isWishlistOpen} 
        onClose={closeWishlist} 
        products={products.filter(p => p.isFavorite)}
      />
      <CartModal
        isOpen={isCartModalOpen} 
        onClose={closeCartModal} 
      />
      <SearchBar onSearch={handleSearch} />
      <Products products={products} />
    </div>
  );
}