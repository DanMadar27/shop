import { GlobalContextProvider } from './Context/store';
import { GlobalProvider } from './GlobalRedux/provider';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shop App',
  description: 'Shop app to buy products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <GlobalProvider>
          <div className='header'>
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
          </GlobalProvider>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
