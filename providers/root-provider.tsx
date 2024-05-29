import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Environment } from '@/app/actions';
import { CosmosChainProvider, ReactQueryProvider } from '@/providers';
import { EnvironmentProvider } from './environment-context.provider';
import { ModalProvider } from './modals-context-provider';

export function RootProvider ({
  children,
  env
}: Readonly<{
  children: React.ReactNode;
  env: Environment;
}>) {
  const messages = useMessages();
  return (
    <ReactQueryProvider>
      <EnvironmentProvider env={env}>
        <CosmosChainProvider>
          <NextIntlClientProvider messages={messages}>
            <ModalProvider>
              {children}
            </ModalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </NextIntlClientProvider>
        </CosmosChainProvider>
      </EnvironmentProvider>
    </ReactQueryProvider>
  );
}
