'use client';
import { History } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Input } from '@/components/ui/input';
import { Line } from '@/components/ui/line';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';
import { HistoryBlock } from './_components/history-block';

export default function Bridge () {
  const [isFromUp, setIsFromUp] = useState(true);
  const [isToDown, setIsToDown] = useState(false);

  const [fromInput, setFromInput] = useState('Injective');
  const [toInput, setToInput] = useState('Axone');
  const [inputOpacity, setInputOpacity] = useState(1);

  const handleSvgClick = () => {
    setIsFromUp(!isFromUp);
    setIsToDown(!isToDown);
  
    // Start the opacity animation
    setInputOpacity(0);
  
    setTimeout(() => {
      // Swap the input values
      const temp = fromInput;
      setFromInput(toInput);
      setToInput(temp);
  
      // End the opacity animation
      setInputOpacity(1);
    }, 420); // Adjust this value to match your CSS transition duration
  };

  return (
    <PageContainer>
      <Box >
        <Column className={'gap-4'}>
          <Text className='mb-0'>From</Text>
          <Row className={cn('items-center gap-2 transition-all duration-500 ease-in-out transform', { 'translate-y-0' : isFromUp, 'translate-y-56': isToDown })}>
            <Image src={'/icons/wallets/keplr.svg'} alt='image' width={25} height={25} className='rounded-full' />
            <Text className='mb-0 uppercase'>Injective</Text>
          </Row>
          <Input
            className={cn('transition-opacity duration-500 ease-in-out',{
              'opacity-0': !inputOpacity,
              'opacity-100': inputOpacity,
            })}
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            placeholder='address'
          />
        </Column>
        <div className='my-12 relative'>
          <svg onClick={handleSvgClick} className='absolute -top-[20px] left-[48%] cursor-pointer' width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='20' cy='20' r='19.5' fill='#00213A' stroke='#FB9501'/>
            <path d='M13.4347 14.1914C13.0668 14.4872 13.276 15.0811 13.748 15.0811L26.2493 15.0811C26.7213 15.0811 26.9304 14.4872 26.5626 14.1914L20.3119 9.16595C20.129 9.01885 19.8683 9.01885 19.6853 9.16595L13.4347 14.1914Z' fill='#FB9501'/>
            <path d='M26.5653 25.8086C26.9332 25.5128 26.724 24.9189 26.252 24.9189L13.7507 24.9189C13.2787 24.9189 13.0696 25.5128 13.4374 25.8086L19.6881 30.8341C19.871 30.9812 20.1317 30.9812 20.3147 30.8341L26.5653 25.8086Z' fill='#FB9501'/>
          </svg>
          <Line />
        </div>
        <Column className={'gap-4'}>
          <Text className='mb-0'>To</Text>
          <Row className={cn('items-center gap-2 transition-all duration-500 ease-in-out transform ', { 'translate-y-0' : isFromUp, '-translate-y-56': isToDown })}>
            <LogoDarkMobile />
            <Text className='mb-0 uppercase'>Axone</Text>
          </Row>
          <Row className='gap-4'>
            <Input
              className={cn('transition-opacity duration-500 ease-in-out',{
                'opacity-0': !inputOpacity,
                'opacity-100': inputOpacity,
              })}
              placeholder='Enter amount'
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
            />
            <Button variant={'rounded'}>Edit Address</Button>
          </Row>
        </Column>
        <Column className='gap-4 mt-12'>
          <Text className='mb-0'>Enter Amount</Text>
          <BoxInner className='flex-col gap-4'>
            <Row className='gap-4 justify-between'>
              <Input placeholder='address' />
              <div className='flex items-center gap-2 mr-4'>
                <LogoDarkMobile />
                <Text className='mb-0 uppercase'>Axone</Text>
              </div>
            </Row>
            <Row className='gap-2 justify-end pr-4 mb-4'>
              <History size={20} className='text-axone-orange' />
              <Text className='mb-0 text-axone-orange'>Available: 0.00 Axone</Text>
            </Row>
          </BoxInner>
        </Column>
        <Button className='w-1/4 mt-6' variant={'rounded'}>Transfer Now</Button>
      </Box>
      <HistoryBlock />
    </PageContainer>
  );
}
