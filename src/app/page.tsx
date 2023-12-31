'use client';

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import styles from './home.module.css';

import {
  language,
  APP_TITLE_INTRODUCTION,
  APP_SUBTITLE_INTRODUCTION,
  EXPLORE,
  LOGIN,
} from '../config/texts';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <h1>{APP_TITLE_INTRODUCTION[language]}</h1>
        <p>{APP_SUBTITLE_INTRODUCTION[language]}</p>
        {!session && (
          <button id='home-login-button' onClick={() => router.push('/login')}>
            {LOGIN[language]}
          </button>
        )}
        <button onClick={() => router.push('/products')}>
          {EXPLORE[language]}
        </button>
      </div>
      <div className='image-container'>
        <img
          src='/logos/tech.jpg'
          alt='NextJS Logo'
        />
      </div>
    </div>
  )
}
