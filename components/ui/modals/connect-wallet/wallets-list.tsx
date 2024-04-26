'use client';
import { WalletRepo } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { FC, useEffect } from 'react';
import { Text } from '@/components/typography';
import { WalletRow } from './wallet-row';
import Row from '../../row';

type WalletsListProps = {
  wallets: WalletRepo | undefined;
};

const WalletsList: FC<WalletsListProps> = ({ wallets }) => {
  const { message, isWalletConnected, isWalletError, closeView } = useChain(
    'cosmoshub'
  );

  useEffect(() => {
    if (isWalletConnected) {
      setTimeout(closeView, 1800);
    }
  }, [closeView, isWalletConnected]);

  if (isWalletError) {
    return (
      <Row className='p-4 justify-between items-center cursor-pointer border-b border-axone-dark-blue group'>
        <Text className='mb-0'>Error connecting to wallet {message}</Text>
      </Row>
    );
  }

  return wallets?.wallets.map(({
    walletName,
    walletPrettyName,
    walletInfo,
    connect,
    downloadInfo,
    isWalletNotExist,
    isWalletConnected,
    isWalletConnecting
  }) => {
    const logo: string = typeof walletInfo?.logo === 'string' ? walletInfo?.logo : typeof walletInfo?.logo === 'object' ? walletInfo?.logo.major : '';
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