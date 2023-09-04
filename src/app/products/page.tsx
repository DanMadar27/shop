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

import { validateSearch } from '@/utils/validation';

const take = 10;

const catalogImages = [
  '/next.svg',
  '/vercel.svg',
]

async function getProducts(skip = 0, take = 10, search = ''): Promise<Product[]> {
  const url = `/api/products?skip=${skip}&take=${take}` + (search ? `&search=${search}` : '');

  const response = await fetch(url);
  const products = await response.json();

  return products;
}

export default function Home() {
  const products = useSelector((state: RootState) => state.products.value);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [eod, setEod] = useState(false); // end of data

  const dispatch = useDispatch();

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProducts().then((products) => {
      // @ts-ignore
      dispatch(setProducts(products));
      setSkip(skip + take);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      // @ts-ignore
      dispatch(setProducts([]));
      setLoading(false);
    });

    return () => {
      // @ts-ignore
      dispatch(setProducts([]));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [skip, loading, eod]);

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
    if (!validateSearch(query)) {
      console.error('Invalid search query');
      return;
    }

    setLoading(true);

    getProducts(0, 10, query).then((products) => {
      // @ts-ignore
      dispatch(setProducts(products));
      setSkip(0 + take);
      setEod(false);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }

  const handleScroll = () => {
    let debounceTimer;

    if (loading || eod) {
      return;
    }

    // Calculate the position 50 pixels above the bottom
    const positionToTrigger = document.documentElement.scrollHeight - 50;

    // Check if the user has reached the position
    if (window.innerHeight + window.scrollY >= positionToTrigger) {
      setLoading(true);

      // Clear the previous debounce timer
      clearTimeout(debounceTimer);

      // Set a new debounce timer
      debounceTimer = setTimeout(() => {
        getProducts(skip).then((newProducts) => {
          if (!newProducts.length) {
            setEod(true);
            setLoading(false);
            return;
          }
          // @ts-ignore
          dispatch(setProducts([...products, ...newProducts]));
          setSkip(skip + take);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      }, 500);
    }
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