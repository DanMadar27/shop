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
import Loading from '@/components/loading/Loading';

import styles from './products.module.css';

import CartModal from '@/components/modals/CartModal';

import { getProducts } from '@/utils/api';

import {
  language,
  OPEN_WISHLIST,
  OPEN_CART,
} from '@/config/texts';

const catalogImages = [
  '/products/tech.jpg',
  '/products/smart-watch.jpg',
  '/products/camera.jpg',
]

export default function Home() {
  const products = useSelector((state: RootState) => state.products.value);

  const { loading, handleSearch } = useLoadOnScroll({
    data: products,
    setData: (products) => {
      // @ts-ignore
      dispatch(setProducts(products));
    },
    apiFunction: getProducts,
    take: 12,
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

  if (loading && !products.length) {
    return <Loading />;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.catalog}>
        <ImageSlider images={catalogImages}/>
      </div>
      <div className={styles['modal-buttons']}>
        <button onClick={openWishlist}>{OPEN_WISHLIST[language]}</button>
        <button onClick={openCartModal}>{OPEN_CART[language]}</button>
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