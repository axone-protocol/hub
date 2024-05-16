'use client';
import { wallets as keplrWallet } from '@cosmos-kit/keplr';
import { ChainProvider } from '@cosmos-kit/react';
import { assets, chains } from 'chain-registry';
import { PropsWithChildren } from 'react';
import { ConnectWalletModal } from '@/components/ui/modals';
import { assetList, chain } from '@/core/chain';
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
            rpc: ['https://api.drunemeton.okp4.network:443/rpc'],
            rest: ['https://api.drunemeton.okp4.network']
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