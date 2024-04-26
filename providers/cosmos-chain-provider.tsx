'use client';

import { wallets as keplrWallet } from '@cosmos-kit/keplr-extension';
import { wallets as leapWallet } from '@cosmos-kit/leap-extension';
import { wallets as metamaskWallet } from '@cosmos-kit/leap-metamask-cosmos-snap';
import { wallets as ledgerWallet } from '@cosmos-kit/ledger';
import { wallets as ninjiWallet } from '@cosmos-kit/ninji';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as shellWallet } from '@cosmos-kit/shell';
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
        ...leapWallet,
        ...ledgerWallet,
        ...metamaskWallet,
        ...shellWallet,
        ...ninjiWallet,
      ]}
      walletModal={ConnectWalletModal}
    >
      {children}
    </ChainProvider>
  );
}