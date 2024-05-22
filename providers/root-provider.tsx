import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { CosmosChainProvider, ReactQueryProvider } from '@/providers';
import { ModalProvider } from './modals-context-provider';

export function RootProvider ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = useMessages();
  return (
    <ReactQueryProvider>
      <CosmosChainProvider>
        <NextIntlClientProvider messages={messages}>
          <ModalProvider>
            {children}
          </ModalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </NextIntlClientProvider>
      </CosmosChainProvider>
    </ReactQueryProvider>
  );
}
