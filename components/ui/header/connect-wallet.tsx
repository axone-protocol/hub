'use client';
import { ChainWalletBase, MainWalletBase } from '@cosmos-kit/core';
import { useChain, useWallet } from '@cosmos-kit/react';
import { CircleCheckBig, CircleX, Copy, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Text } from '@/components/typography';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../button';
import TermsModal from '../modals/terms/terms-modal';
import Row from '../row';

const getWalletLogo = (wallet: MainWalletBase | ChainWalletBase | undefined): string => {
  let logo = '';
  if (typeof wallet?.walletInfo?.logo === 'string') {
    logo = wallet?.walletInfo?.logo;
  } else if (typeof wallet?.walletInfo?.logo === 'object') {
    logo = wallet?.walletInfo?.logo.major;
  }
  return logo;
};

const ConnectWallet = () => {
  const t  = useTranslations('Index');
  const { address, openView, disconnect, isWalletConnected, isWalletConnecting, isWalletError, isWalletDisconnected, wallet } = useChain(
    'cosmoshub'
  );
  const { toast } = useToast();
  const { mainWallet } = useWallet();
  const shortenedAddress = `${address?.slice(0, 8)}...${address?.slice(-4)}`;
  const [openTerms, setOpenTerms] = useState(false);

  const logo: string = getWalletLogo(mainWallet);

  useEffect(() => {
    const autoConnectWallet = async () => {
      await mainWallet?.connect();
    };
    autoConnectWallet();
  }, [mainWallet]);

  const onConnect = useCallback(async () => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (termsAccepted) {
      openView();
    } else {
      setOpenTerms(true);
    }
  }, [openView]);

  useEffect(() => {
    let timeoutId: number;
    if (isWalletError) {
      timeoutId = window.setTimeout(disconnect, 2500);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [disconnect, isWalletError]);

  const copyToClipboard = useCallback((address: string | undefined) => () => {
    if (!address) {
      return toast({
        action: (
          <Row className='items-center -ml-2'>
            <CircleX className='mr-3 text-axone-red' />
            {'Something went wrong, please try again later.'}
          </Row>
        )
      });
    };
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
      <>
        <Button onClick={onConnect} variant='rounded' className='px-10 font-bold'>
          {t('Connect')}
        </Button>
        <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openView} />
      </>
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
  }
  return null;
};

export { ConnectWallet, getWalletLogo };