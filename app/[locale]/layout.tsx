import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import { Suspense } from 'react';
import { Header } from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { RootProvider } from '@/providers';
import Loading from './loading';
import { getEnvironment } from '../actions';

import './globals.css';

const font = Courier_Prime({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'AXONE',
  description: 'Axone hub',
  icons: {
    icon: '/icon.png',
  },
};

export default async function RootLayout ({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const env = await getEnvironment();
  return (
    <html lang={locale}>
      <body className={`${font.className} bg-axone-bg-dark`}>
        <RootProvider env={env} >
          <main className='flex w-full h-screen'>
            <Sidebar />
            <div className='w-full flex justify-center h-screen overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-axone-dark-blue scrollbar-track-axone-bg-dark scroll-my-6'>
              <Header />
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </div>
          </main>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </RootProvider>
      </body>
    </html>
  );
}
