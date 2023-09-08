import Link from 'next/link';
import styles from './home.module.css';

export default function Hero() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Welcome To The Shop</h1>
        <p>Your place to buy products</p>
        <button>
          <Link href='/login'>Login</Link>
        </button>
        <button>
          <Link href='/products'>See Products</Link>
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
