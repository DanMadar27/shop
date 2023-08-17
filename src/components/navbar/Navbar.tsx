'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
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
        <Link href='/'>Home</Link>
        <Link href='/products'>Products</Link>
        <Link href='/cart'>Cart</Link>
        <Link href='/login'>Login</Link>
      </div>
      <div className={styles.hamburger} onClick={toggleLinks}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
