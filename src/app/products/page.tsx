'use client';

import { RootState } from '../GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../GlobalRedux/features/products/productSlice';

import { useState, useEffect } from 'react';

import ImageSlider from '../../components/catalog/ImageSlider';
import SearchBar from '../../components/inputs/SearchBar/SearchBar';
import Products from '../../components/products/Products';
import Wishlist from '../../components/modals/Wishlist';

import styles from './products.module.css';

import Product from '../../models/Product';
import CartModal from '@/components/modals/CartModal';

const catalogImages = [
  '/next.svg',
  '/vercel.svg',
]

async function getProducts(skip = '0', take = '10', search = ''): Promise<Product[]> {
  const url = `/api/products?skip=${skip}&take=${take}` + (search ? `&search=${search}` : '');

  const response = await fetch(url);
  const products = await response.json();

  return products;
}

export default function Home() {
  const products = useSelector((state: RootState) => state.products.value);

  const dispatch = useDispatch();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    getProducts().then((products) => {
      // @ts-ignore
      dispatch(setProducts(products));
    })
    .catch((error) => {
      console.error(error);
      // @ts-ignore
      dispatch(setProducts([]));
    });

    return () => {
      // @ts-ignore
      dispatch(setProducts([]));
    }
  }, []);

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

  const handleSearch = (query: string) => {
    getProducts('0', '10', query).then((products) => {
      // @ts-ignore
      dispatch(setProducts(products));
    })
    .catch((error) => {
      console.error(error);
    });
  }

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