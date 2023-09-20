import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import 'material-icons/iconfont/filled.css';

const Footer: React.FC = () => {
  
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <p>Quick Links</p>
        <Link href='/'>Home</Link>
        <Link href='/login'>Login</Link>
        <Link href='/products'>Products</Link>
      </div>
      <p className={styles.copyright}>Copyright © 2023 website owner</p>
    </footer>
  );
};

export default Footer;
