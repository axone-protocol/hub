'use client';
import { capitalize } from 'lodash';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Text from '@/components/typography/text';
import Title from '@/components/typography/title';
import BoxInner from '../../box-inner';
import { Button } from '../../button';
import Column from '../../column';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import Row from '../../row';

const ConnectWalletRow = ({ wallet }: {wallet: string}) => {
  return (
    <Row className='p-4 justify-between items-center cursor-pointer border-b border-axone-dark-blue group'>
      <Image className='mr-4' src={`/icons/wallets/${wallet}.svg`} alt='Metamask' width={40} height={40} />
      <div className='flex-grow flex flex-col'>
        <Title className='mb-0'>{capitalize(wallet)}</Title>
        <Text className='mb-0'>Connect using browser wallet</Text>
      </div>
      <ArrowUpRight className='ml-4 h-8 w-8 mb-0.5 text-axone-khaki group-hover:text-axone-orange' />
    </Row>
  );
};

const ConnectWalletModal = () => {
  const t  = useTranslations('Index');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'rounded'} className='px-10 font-bold'>
          {t('Connect')}
        </Button>
      </DialogTrigger>
      <DialogContent className='text-white w-1/3 h-3/4'>
        <DialogHeader>
          <DialogTitle>Connect to Wallet</DialogTitle>
        </DialogHeader>
        <DialogDescription className='overflow-y-auto scrollbar-none h-full'>
          <BoxInner>
            <Column>
              <ConnectWalletRow wallet='keplr' />
              <ConnectWalletRow wallet='metamask' />
              <ConnectWalletRow wallet='okx' />
              <ConnectWalletRow wallet='ninji' />
              <ConnectWalletRow wallet='ledger' />
              <ConnectWalletRow wallet='leap' />
              <ConnectWalletRow wallet='bitget' />
              <ConnectWalletRow wallet='trust' />
              <ConnectWalletRow wallet='cosmostation' />
              <ConnectWalletRow wallet='torus' />
              <ConnectWalletRow wallet='phantom' />
              <ConnectWalletRow wallet='trezor' />
            </Column>
          </BoxInner>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );};

export default ConnectWalletModal;