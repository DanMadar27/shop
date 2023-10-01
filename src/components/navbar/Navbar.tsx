'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import User from '../profile/User';

import styles from './navbar.module.css';
import 'material-icons/iconfont/filled.css';

import {
  language,
  HOME,
  PRODUCTS,
  CART,
  ORDERS,
  LOGIN,
  LOGOUT,
} from '@/config/texts';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const [showLinks, setShowLinks] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setShowLinks(false);
    }
  };
  
  const loginButton = () => {
    return session ? (
      <button onClick={() => signOut()}>
        <span className='material-icons'>logout</span>
        {LOGOUT[language]}
      </button>
    ): (
      <button onClick={() => signIn()} className={pathname === '/login' ? styles.active : ''}>
        <span className='material-icons'>login</span>
        {LOGIN[language]}
      </button>
    );
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowLinks(false);
  }, [pathname]);
  
  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className='flex-row-start'>
        <div className={styles.logo}>
          <Link href='/'>
            <img
              
              src='/logos/tech.jpg'
              alt='Shop Logo'
              width={150}
              height={100}
            />
          </Link>
        </div>
        <User />
      </div>
      <div className={`${styles.links} ${showLinks ? styles['show-links'] : ''}`}>
        <Link href='/' className={pathname === '/' ? styles.active : ''}>
          <span className='material-icons'>home</span>
          {HOME[language]}
        </Link>
        <Link href='/products' className={pathname.startsWith('/products') ? styles.active : ''}>
          <span className='material-icons'>inventory_2</span>
          {PRODUCTS[language]}
        </Link>
        <Link href='/cart' className={pathname === '/cart' ? styles.active : ''}>
          <span className='material-icons'>shopping_cart</span>
          {CART[language]}
        </Link>
        <Link href='/orders' className={pathname === '/orders' ? styles.active : ''}>
          <span className='material-icons'>list_alt</span>
          {ORDERS[language]}
        </Link>
        { loginButton() }
      </div>
      <div 
        className={`${styles.hamburger} ${showLinks ? styles.open : ''}`}
        onClick={toggleLinks}
      >
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
