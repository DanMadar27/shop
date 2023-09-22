import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import 'material-icons/iconfont/filled.css';

const Footer: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <p>Quick Links</p>
        <Link href='/'>Home</Link>
        <Link href='/products'>Products</Link>
        { !session && <Link href='/login'>Login</Link> }
        { session && <Link href='/cart'>Cart</Link> }
        { session && <Link href='/orders'>Orders</Link> }
      </div>
      <p className={styles.copyright}>Copyright © 2023 website owner</p>
    </footer>
  );
};

export default Footer;
