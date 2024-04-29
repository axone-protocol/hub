'use client';

import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';

import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { PropsWithChildren } from 'react';
import { ConnectWalletModal } from '@/components/ui/modals';

export function CosmosChainProvider ({ children }: PropsWithChildren) {
  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={[
        ...keplrWallet,
      ]}
      walletModal={ConnectWalletModal}
    >
      {children}
    </ChainProvider>
  );
}