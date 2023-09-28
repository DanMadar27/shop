'use client';

import React from 'react'
import { useSession } from 'next-auth/react';
import styles from './User.module.css';

import { isEnglish } from '@/utils/languages';

const User: React.FC = () => {
  const { data: session } = useSession();

  if (!session) return null;

  const name = session?.user?.name || '';
  const email = session?.user?.email || '';

  return (
    <div className={styles.container}>
      { name && isEnglish(name) && (
        <p> { name }</p>
      )}
      { email && (
        <p> { email.split('@')[0] }</p>
      )}
    </div>
  )
}

export default User;