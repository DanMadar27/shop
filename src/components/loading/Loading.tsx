import React from 'react'
import styles from './Loading.module.css';
import LoadingSpinner from './LoadingSpinner';

export default function Loading() {
  return (
    <div className={styles.container}>
      <LoadingSpinner />
    </div>
  )
}
