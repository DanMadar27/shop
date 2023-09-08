'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';

import styles from './navbar.module.css';
import 'material-icons/iconfont/filled.css';

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
        Logout
      </button>
    ): (
      <button onClick={() => signIn()} className={pathname === '/login' ? styles.active : ''}>
        <span className='material-icons'>login</span>
        Login
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
      <div className={styles.logo}>
        <Link href='/'>
          <img
            src='/next.svg'
            alt='Shop Logo'
            width={150}
            height={50}
          />
        </Link>
      </div>
      <div className={`${styles.links} ${showLinks ? styles['show-links'] : ''}`}>
        <Link href='/' className={pathname === '/' ? styles.active : ''}>
          <span className='material-icons'>home</span>
          Home
        </Link>
        <Link href='/products' className={pathname.startsWith('/products') ? styles.active : ''}>
          <span className='material-icons'>inventory_2</span>
          Products
        </Link>
        <Link href='/cart' className={pathname === '/cart' ? styles.active : ''}>
          <span className='material-icons'>shopping_cart</span>
          Cart
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
