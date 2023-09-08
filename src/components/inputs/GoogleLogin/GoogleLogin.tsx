'use client';

import React from 'react';
import styles from './GoogleLogin.module.css';
import 'material-icons/iconfont/filled.css';

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react';

const GoogleLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <button 
      className={styles.button}
      onClick={() => signIn('google', { callbackUrl: callbackUrl || '/' } )}>
      Login with Google
      <span className='material-icons'> login </span>
    </button>
  );
};

export default GoogleLogin;
