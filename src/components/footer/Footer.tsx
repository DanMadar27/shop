import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import 'material-icons/iconfont/filled.css';

import {
  language,
  HOME,
  PRODUCTS,
  LOGIN,
  CART,
  ORDERS,
  COPYRIGHT,
  QUICK_LINKS,
} from '@/config/texts';

const Footer: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <p>{QUICK_LINKS[language]}</p>
        <Link href='/'>{HOME[language]}</Link>
        <Link href='/products'>{PRODUCTS[language]}</Link>
        { !session && <Link href='/login'>{LOGIN[language]}</Link> }
        { session && <Link href='/cart'>{CART[language]}</Link> }
        { session && <Link href='/orders'>{ORDERS[language]}</Link> }
      </div>
      <p className={styles.copyright}>{COPYRIGHT[language]}</p>
    </footer>
  );
};

export default Footer;
