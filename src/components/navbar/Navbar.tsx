'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'

import styles from './navbar.module.css';
import 'material-icons/iconfont/filled.css';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src='/next.svg'
          alt='Shop Logo'
          width={150}
          height={50}
        />
      </div>
      <div className={`${styles.links} ${showLinks ? styles['show-links'] : ''}`}>
        <a href='/' className={pathname === '/' ? styles.active : ''}>
          <span className='material-icons'>home</span>
          Home
        </a>
        <a href='/products' className={pathname.startsWith('/products') ? styles.active : ''}>
          <span className='material-icons'>inventory_2</span>
          Products
        </a>
        <a href='/cart' className={pathname === '/cart' ? styles.active : ''}>
          <span className='material-icons'>shopping_cart</span>
          Cart
        </a>
        <a href='/login' className={pathname === '/login' ? styles.active : ''}>
          <span className='material-icons'>login</span>
          Login
        </a>
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
