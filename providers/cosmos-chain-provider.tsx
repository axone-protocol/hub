'use client';
import { wallets as keplrWallet } from '@cosmos-kit/keplr';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { PropsWithChildren } from 'react';
import { ConnectWalletModal } from '@/components/ui/modals';
import { assetList, chain, chainRPC } from '@/core/chain';
import { config } from '@/core/config';

export function CosmosChainProvider ({ children }: PropsWithChildren) {
  return (
    <ChainProvider
      chains={[...chains, chain]}
      assetLists={[...assets, assetList]}
      wallets={[
        ...keplrWallet,
      ]}
      endpointOptions={{
        endpoints: {
          okp4: {
            rpc: [chainRPC]
          }
        }
      }}
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