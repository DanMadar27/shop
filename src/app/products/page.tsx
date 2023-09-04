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

async function getProducts(): Promise<Product[]> {
  // return mock data. In the future, this will be an API call
  return [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description. more mock description',
      price: 100,
      isFavorite: false,
      quantity: 3,
      image: '/vercel.svg'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 150,
      isFavorite: false,
      quantity: 2,
      image: '/vercel.svg'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Product 3 description',
      price: 200,
      isFavorite: true,
      quantity: 1,
      image: '/vercel.svg'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Product 4 description',
      price: 100,
      isFavorite: true,
      quantity: 0,
      image: '/vercel.svg'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Product 5 description',
      price: 100,
      isFavorite: true,
      quantity: 0,
      image: '/vercel.svg'
    },
    {
      id: 6,
      name: 'Product 6',
      description: 'Product 6 description',
      price: 100,
      isFavorite: false,
      quantity: 0,
      image: '/vercel.svg'
    },
    {
      id: 7,
      name: 'Product 7',
      description: 'Product 7 description',
      price: 100,
      isFavorite: false,
      quantity: 0,
      image: '/vercel.svg'
    },
    {
      id: 8,
      name: 'Product 8',
      description: 'Product 8 description',
      price: 100,
      isFavorite: false,
      quantity: 0,
      image: '/vercel.svg'
    },
  ]
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
    // This will be API call in the future
    //  so add regex for security in security task
    const filteredProducts = products.filter(
      p => p.name.toLowerCase().includes(query.toLowerCase())
    );

    // @ts-ignore
    dispatch(setProducts(filteredProducts));
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