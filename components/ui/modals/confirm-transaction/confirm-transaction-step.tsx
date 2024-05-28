'use client';
import Image from 'next/image';
import { FC } from 'react';
import Text from '@/components/typography/text';
import { BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Line } from '@/components/ui/line';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import Row from '@/components/ui/row';

type ConfirmTransactionStepProps = {
  onConfirm: () => void;
};

const ConfirmTransactionStep: FC<ConfirmTransactionStepProps> = ({ onConfirm }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-left text-20'>Confirm Transaction</DialogTitle>
        <Text>Please review your transaction</Text>
      </DialogHeader>
      <div className='overflow-y-auto scrollbar-none h-full'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <LogoDarkMobile className='w-10 h-10' />
          <p className='text-40'>0.10 Axone</p>
          <Text className='text-axone-khaki'>$199.99</Text>
        </div>
        <div className='flex justify-between gap-4 items-center my-8'>
          <BoxInner className='p-2 w-1/2 items-center gap-2'>
            <Image className='rounded-full' src='/icons/wallets/bitget.svg' alt='token' width={24} height={24} />
            <Text className='mb-0'>Ethereum</Text>
          </BoxInner>
          <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='20' cy='20' r='19.5' transform='rotate(-90 20 20)' fill='#00213A' stroke='#FB9501'/>
            <g clip-path='url(#clip0_599_4579)'>
              <path d='M18.8086 13.4347C18.5128 13.0668 17.9189 13.276 17.9189 13.748L17.9189 26.2493C17.9189 26.7213 18.5128 26.9304 18.8086 26.5626L23.8341 20.3119C23.9812 20.129 23.9812 19.8683 23.8341 19.6853L18.8086 13.4347Z' fill='#FB9501'/>
            </g>
            <defs>
              <clipPath id='clip0_599_4579'>
                <rect width='20' height='40' fill='white' transform='translate(0 30) rotate(-90)'/>
              </clipPath>
            </defs>
          </svg>
          <BoxInner className='p-2 w-1/2 items-center gap-2'>
            <Image className='rounded-full' src='/icons/wallets/trust.svg' alt='token' width={24} height={24} />
            <Text className='mb-0'>Axone</Text>
          </BoxInner>
        </div>
        <Row className='justify-between'>
          <Text className='text-axone-khaki'>Amount</Text>
          <p><Text className='text-axone-khaki'>$199.99</Text> 0.10 Axone</p>
        </Row>
        <Line className='my-4' />
        <Row className='justify-between'>
          <Text>Transfer Amount</Text>
          <p><Text className='text-axone-khaki'>$199.99</Text> 0.10 Axone</p>
        </Row>
        <Button onClick={onConfirm} className='w-full mt-6' variant={'rounded'}>Confirm</Button>
      </div>
    </>
  );
};

export { ConfirmTransactionStep };