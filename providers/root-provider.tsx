import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { CosmosChainProvider, ReactQueryProvider } from '@/providers';

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
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </NextIntlClientProvider>
      </CosmosChainProvider>
    </ReactQueryProvider>
  );
}
