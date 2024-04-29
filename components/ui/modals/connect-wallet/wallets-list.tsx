'use client';
import { WalletRepo } from '@cosmos-kit/core';
import { ChainWalletBase } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { FC, useEffect } from 'react';
import { Text } from '@/components/typography';
import { WalletRow } from './wallet-row';
import { getWalletLogo } from '../../header/connect-wallet';
import Row from '../../row';

type WalletsListProps = {
  wallets: WalletRepo | undefined;
};

const WalletsList: FC<WalletsListProps> = ({ wallets }) => {
  const { message, isWalletConnected, isWalletError, closeView } = useChain(
    'cosmoshub'
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isWalletConnected) {
      timeoutId = setTimeout(closeView, 1800);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [closeView, isWalletConnected]);

  if (isWalletError) {
    return (
      <Row className='p-4 justify-between items-center cursor-pointer border-b border-axone-dark-blue group'>
        <Text className='mb-0'>Error connecting to wallet {message}</Text>
      </Row>
    );
  }

  return wallets?.wallets.map((wallet: ChainWalletBase) => {
    const {
      walletName,
      walletPrettyName,
      connect,
      downloadInfo,
      isWalletNotExist,
      isWalletConnected,
      isWalletConnecting
    } = wallet;
    const logo: string = getWalletLogo(wallet);
    return (
      <WalletRow
        link={downloadInfo?.link}
        key={walletName}
        logo={logo}
        isInstalled={isWalletNotExist}
        onClick={connect}
        wallet={walletPrettyName}
        isWalletConnected={isWalletConnected}
        isWalletConnecting={isWalletConnecting}
      />
    );
  });
};

export { WalletsList };