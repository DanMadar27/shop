'use client';

import React from 'react'
import { useSession } from 'next-auth/react';
import styles from './User.module.css';

const User: React.FC = () => {
  const { data: session } = useSession();

  if (!session?.user?.name) return null;

  const { name, email } = session.user;

  return (
    <div className={styles.container}>
      <h3>{ name }</h3>
      { email && (
        <p> { session.user?.email }</p>
      )}
    </div>
  )
}

export default User;