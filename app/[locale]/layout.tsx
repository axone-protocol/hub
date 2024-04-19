import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Suspense } from 'react';
import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';
import Loading from './loading';

const font = Courier_Prime({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout ({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={`${font.className} bg-axone-bg-dark`}>
        <NextIntlClientProvider messages={messages}>
          <main className='flex w-full h-screen'>
            <Sidebar />
            <div className='w-full flex justify-center h-screen overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-axone-dark-blue scrollbar-track-axone-bg-dark scroll-my-6'>
              <Header />
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
