import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Select all of your favorite products',
}

import styles from './products.module.css';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.header}>
          {/* here put shop logo */}
          <img
            src='/next.svg'
            alt='Shop Logo'
            width={200}
            height={200}
          />
          <h1>Shop</h1>
        </div>
        {children}
      </body>
    </html>
  )
}
