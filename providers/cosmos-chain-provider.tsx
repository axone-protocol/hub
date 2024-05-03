'use client';

import { wallets as keplrWallet } from '@cosmos-kit/keplr';

import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { PropsWithChildren } from 'react';
import { ConnectWalletModal } from '@/components/ui/modals';
import { config } from '@/core/config';

export function CosmosChainProvider ({ children }: PropsWithChildren) {
  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={[
        ...keplrWallet,
      ]}
      walletConnectOptions={{
        signClient: {
          // TODO: Replace project ID from (https://cloud.walletconnect.org/)
          // It's needed for WalletConnect to work on mobile
          projectId: config.walletConnectID || '',
        }
      }}
      walletModal={ConnectWalletModal}
    >
      {children}
    </ChainProvider>
  );
}