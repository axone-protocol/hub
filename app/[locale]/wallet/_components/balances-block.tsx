'use client';
import Image from 'next/image';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Row from '@/components/ui/row';

const BalancesBlock = () => {
  return (
    <Box className='w-full lg:w-2/3 mb-0 mx-0 lg:mx-0'>
      <div className='flex flex-row justify-between mb-6 lg:items-center'>
        <Title>Balances</Title>
        <ButtonWithIcon variant={'link'} className=' text-axone-orange text-base font-bold z-8 pr-0 pt-0'>
        Bridge
        </ButtonWithIcon>
      </div>

      <Row className='justify-between'>
        <Text>Asset</Text>
        <Text>Balance</Text>
      </Row>

      <BoxInner className='flex-col pb-4 mb-4'>

        <Row className='justify-between p-4  group'>
          <div className='flex flex-row gap-4 w-1/4'>
            <Image src='/icons/wallets/keplr.svg' className='rounded-full' width={38} height={38} alt='AXONE' />
            <div className='flex flex-col'>
              <Text className='mb-0'>Axone</Text>
              <Text className='mb-0 text-axone-khaki'>AXONE</Text>
            </div>
          </div>
          <div className='flex flex-row gap-4 w-1/4 justify-end items-center'>
            <Button variant={'link'} className='mb-0 mr-4 text-axone-orange hidden group-hover:flex'>Convert</Button>
            <Text className='mb-0'>0.02</Text>
            <Text className='mb-0 text-axone-khaki'>AXONE</Text>
          </div>
        </Row>
        <Row className='justify-between p-4 group bg-axone-dark-blue-3'>
          <div className='flex flex-row gap-4 w-1/4'>
            <Image src='/icons/wallets/okx.svg' className='rounded-full' width={38} height={38} alt='AXONE' />
            <div className='flex flex-col'>
              <Text className='mb-0'>Injective</Text>
              <Text className='mb-0 text-axone-khaki'>INJ</Text>
            </div>
          </div>
          <div className='flex flex-row gap-4 w-1/4 justify-end items-center'>
            <Button variant={'link'} className='mb-0 mr-4 text-axone-orange hidden group-hover:flex'>Convert</Button>
            <Text className='mb-0'>0.02</Text>
            <Text className='mb-0 text-axone-khaki'>INJ</Text>
          </div>
        </Row>

      </BoxInner>
      <Button variant={'rounded'} className='px-12'>
        Show More
      </Button>
    </Box>
  );
};

export { BalancesBlock };