'use client';
import { ChainWalletBase, MainWalletBase } from '@cosmos-kit/core';
import { useChain, useWallet } from '@cosmos-kit/react';
import { BarChart2, CircleCheckBig, CircleX, UserRoundX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useState } from 'react';
import { Text } from '@/components/typography';
import { chainName } from '@/core/chain';
import { useToast } from '@/hooks/use-toast';
import { DesktopMenuAuthorized } from './desktop-menu-authorized';
import { MobileMenuAuthorized } from './mobile-menu/mobile-menu-authorized';
import { Button } from '../button';
import TermsModal from '../modals/terms/terms-modal';
import Row from '../row';
import Spinner from '../spinner';

const getWalletLogo = (wallet: MainWalletBase | ChainWalletBase | undefined): string => {
  let logo = '';
  if (typeof wallet?.walletInfo?.logo === 'string') {
    logo = wallet?.walletInfo?.logo;
  } else if (typeof wallet?.walletInfo?.logo === 'object') {
    logo = wallet?.walletInfo?.logo.major;
  }
  return logo;
};

type ConnectWalletProps = {
  openMobileMenu?: () => void;
};

const ConnectWallet: FC<ConnectWalletProps> = ({ openMobileMenu = () => null }) => {
  const t  = useTranslations('Index');
  const { address, openView, disconnect, isWalletConnected, isWalletConnecting, isWalletError, isWalletDisconnected, wallet } = useChain(
    chainName
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
      <>
        <Button variant={'rounded'} className='hidden lg:flex px-10 font-bold'>
          {`Connecting to ... ${wallet?.prettyName}`}
        </Button>
        <div className='flex items-center justify-end'>
          <Spinner size={20} />
          <Text>Connecting to {wallet?.prettyName}</Text>
          <div onClick={openMobileMenu} className='cursor-pointer'>
            <BarChart2 className='text-axone-grey rotate-90' />
          </div>
        </div>
      </>
    );
  }
  if (isWalletDisconnected) {
    return (
      <>
        <Button onClick={onConnect} variant='rounded' className='hidden lg:flex px-10 font-bold'>
          {t('Connect')}
        </Button>
        <div className='lg:hidden flex'>
          <div className='cursor-pointer mr-6' onClick={onConnect}>
            <UserRoundX className='text-axone-red' />
          </div>
          <div onClick={openMobileMenu} className='cursor-pointer'>
            <BarChart2 className='text-axone-grey rotate-90' />
          </div>
        </div>
        <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openView} />
      </>
    );
  }
  if (isWalletConnected) {
    return (
      <>
        <DesktopMenuAuthorized
          logo={logo}
          address={address}
          shortenedAddress={shortenedAddress}
          copyToClipboard={copyToClipboard}
          disconnect={disconnect}
          prettyName={wallet?.prettyName}
        />
        <MobileMenuAuthorized
          logo={logo}
          openMobileMenu={openMobileMenu}
          address={address}
          shortenedAddress={shortenedAddress}
          copyToClipboard={copyToClipboard}
          disconnect={disconnect}
          prettyName={wallet?.prettyName}/>
      </>
    );
  }
  return null;
};

export { ConnectWallet, getWalletLogo };