import { GlobalContextProvider } from './Context/store';
import { GlobalProvider } from './GlobalRedux/provider';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
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
          <Navbar />
            {children}
          <Footer />
          </GlobalProvider>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
