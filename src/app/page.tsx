import Link from 'next/link';

import classes from './hero.module.css'

export default function Hero() {
  return (
    <div className={classes.container}>
      <div>
        <h1>Welcome To The Shop</h1>
        <p>Your place to buy products</p>
        <button>
          <Link href='/register'>Join Today</Link>
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
