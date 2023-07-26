import Image from 'next/image'

import classes from './hero.module.css'

export default function Home() {
  return (
    <div className={classes.container}>
      <div>
        <h1>Welcome To The Shop</h1>
        <p>Your place to buy products</p>
        <button>Join Now</button>
      </div>
      <div className='image-container'>
        <Image
          src='/next.svg'
          alt='NextJS Logo'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </div>
  )
}
