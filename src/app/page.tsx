'use client';

import { useRouter } from 'next/navigation'

import styles from './hero.module.css'

export default function Hero() {
  const router = useRouter();

  const handleJoin = () => {
    router.push('/register')
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome To The Shop</h1>
        <p>Your place to buy products</p>
        <button onClick={handleJoin}>
          Join Today
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
