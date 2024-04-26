'use client';
import { useChain, useWallet } from '@cosmos-kit/react';
import { CircleCheckBig, Copy, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { Text } from '@/components/typography';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../button';
import Row from '../row';

const ConnectWallet = () => {
  const t  = useTranslations('Index');
  const { address, openView, disconnect, isWalletConnected, isWalletConnecting, isWalletError, isWalletDisconnected, wallet } = useChain(
    'cosmoshub'
  );
  const { toast } = useToast();
  const { mainWallet } = useWallet();
  const shortenedAddress = `${address?.slice(0, 8)}...${address?.slice(-4)}`;

  const logo = typeof mainWallet?.walletInfo?.logo === 'string' ? mainWallet?.walletInfo?.logo : typeof mainWallet?.walletInfo?.logo === 'object' ? mainWallet?.walletInfo?.logo.major : '';

  useEffect(() => {
    const fn = async () => {
      await mainWallet?.connect();
    };
    fn();
  }, [mainWallet]);

  useEffect(() => {
    if (isWalletError) {
      setTimeout(disconnect, 2500);
    }
  }, [disconnect, isWalletError]);

  const copyToClipboard = useCallback((address: string | undefined) => () => {
    navigator.clipboard.writeText(`${address}`);
    toast({
      action: (
        <Row className='items-center -ml-2'>
          <CircleCheckBig className='mr-3 text-axone-orange' />
          {'Address copied to your clipboard'}
        </Row>
      )
    });
  }, [toast]);

  if (isWalletConnecting) {
    return(
      <Button variant={'rounded'} className='px-10 font-bold'>
        {`Connecting to ... ${wallet?.prettyName}`}
      </Button>
    );
  }
  if (isWalletDisconnected) {
    return (
      <Button onClick={openView} variant='rounded' className='px-10 font-bold'>
        {t('Connect')}
      </Button>
    );
  }
  if (isWalletConnected) {
    return (
      <Row className='items-center'>
        <Row className='items-center border-r-2 border-axone-box-border'>
          <Image src={logo} alt={`${wallet?.prettyName}`} width={20} height={20} />
          <Text className='mb-0 mx-2 select-none'>{`${shortenedAddress}`}</Text>
          <Copy
            className='mx-2 cursor-pointer hover:bg-axone-bg-dark'
            width={20}
            onClick={copyToClipboard(address)}
            stroke='white'
            strokeWidth={2}
            absoluteStrokeWidth
          />
        </Row>
        <LogOut
          className='mx-4 cursor-pointer hover:bg-axone-bg-dark'
          width={20}
          onClick={() => disconnect()}
          stroke='white'
          strokeWidth={2}
          absoluteStrokeWidth
        />
      </Row>
    );
  }};

export { ConnectWallet };