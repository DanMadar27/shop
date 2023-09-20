'use client';

import { useRouter } from 'next/navigation'
import styles from './home.module.css';

export default function Hero() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome To The Shop</h1>
        <p>Your place to buy products</p>
        <button id='home-login-button' onClick={() => router.push('/login')}>
          Login
        </button>
        <button onClick={() => router.push('/products')}>
          See Products
        </button>
      </div>
      <div className='image-container'>
        <img
          src='/next.svg'
          alt='NextJS Logo'
        />
      </div>
    </div>
  )
}
