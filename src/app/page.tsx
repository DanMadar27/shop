'use client';

import { useRouter } from 'next/navigation'
import styles from './home.module.css';
import {
  language,
  APP_TITLE_INTRODUCTION,
  APP_SUBTITLE_INTRODUCTION,
  EXPLORE,
  LOGIN,
} from '../config/texts';

export default function Hero() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <h1>{APP_TITLE_INTRODUCTION[language]}</h1>
        <p>{APP_SUBTITLE_INTRODUCTION[language]}</p>
        <button id='home-login-button' onClick={() => router.push('/login')}>
          {LOGIN[language]}
        </button>
        <button onClick={() => router.push('/products')}>
          {EXPLORE[language]}
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
