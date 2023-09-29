'use client';

import React from 'react';
import styles from './GoogleLogin.module.css';
import 'material-icons/iconfont/filled.css';

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react';

import {
  language,
  GOOGLE_LOGIN,
} from '@/config/texts';

const GoogleLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <button 
      className={styles.button}
      onClick={() => signIn('google', { callbackUrl: callbackUrl || '/' } )}>
      {GOOGLE_LOGIN[language]}
      <img
        src='/icons/google.svg'
        alt='Google Logo'
        width={30}
        height={30}
      />
    </button>
  );
};

export default GoogleLogin;
