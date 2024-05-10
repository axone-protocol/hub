'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { DelegateModal } from '@/components/ui/modals/delegate/delegate-modal';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';

const UptimeBlockItem = ({ size = 'large', type = 'signed' }) => {
  return(
    <div className={cn('rounded-md flex justify-center items-center',
      {
        'w-8 h-8' : size === 'large',
        'w-6 h-6': size === 'small',
        'bg-axone-khaki': type === 'signed',
        'bg-axone-orange': type === 'proposed',
        'bg-axone-bg-dark border border-axone-khaki': type === 'missed',
      })}>
      <X className={cn('text-axone-khaki hidden', { 'flex': type === 'missed', ' w-5 h-5': size === 'small', 'w-7 h-7': size === 'large' })} />
    </div>
  );
};

export default function ValidatorDetails () {
  const [isDelegateOpen, setIsDelegateOpen] = useState<boolean>(false);

  return (
    <PageContainer>
      <Box>
        <Row>
          <Title>Validator Details</Title>
        </Row>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-6 lg:mb-10'>
          <div className='flex flex-row items-center gap-4 w-1/4'>
            <div className='relative border rounded-full w-[60px] h-[60px] p-2'>
              <div className='relative w-full h-full p-[5px]'>
                <Image src='/icons/wallets/ninji.svg' className='rounded-full' fill={true} alt='AXONE' />
              </div>
            </div>

            <div className='flex flex-col h-16 justify-between cursor-pointer'>
              <span className='w-[70px] text-center text-[12px] text-axone-khaki bg-axone-bg-dark p-1 rounded-md uppercase'>Active</span>
              <span className='text-20 text-white'>Ubik Capital</span>
            </div>
          </div>

          <Button variant={'rounded'} onClick={() => setIsDelegateOpen(true)}>Delegate Now</Button>
        </div>

        <div className='w-full border-b-2 border-b-axone-box-border'></div>

        <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 my-10'>

          <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
            <Title className='mt-2 mb-0'>328,540.40</Title>
            <Text className='text-axone-khaki mb-0 uppercase'>
              Total Staked
            </Text>
          </BoxInner>

          <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
            <Title className='mt-2 mb-0'>5.00%</Title>
            <Text className='text-axone-khaki mb-0 uppercase'>
              Commission Rate
            </Text>
          </BoxInner>

          <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
            <Title className='mt-2 mb-0 uppercase'>0.64%</Title>
            <Text className='text-axone-khaki mb-0 uppercase'>
              Voting Power
            </Text>
          </BoxInner>

          <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
            <Title className='mt-2 mb-0'>3.08%</Title>
            <Text className='text-axone-khaki mb-0 uppercase'>
              Uptime
            </Text>
          </BoxInner>
        </div>

        <BoxInner className='flex-col p-6 mb-4'>
          <div className='flex flex-col gap-4 lg:flex-row lg:justify-between items-center mb-10'>
            <div className='w-1/2'>
              <Title>Address</Title>
              <Text className='text-axone-khaki'>axn...ty028k</Text>
            </div>
            <div className='w-1/2'>
              <Title>Website</Title>
              <Text className='text-axone-khaki'>https://example.com</Text>
            </div>
          </div>
          <div className='flex flex-col gap-4 lg:flex-row lg:justify-between items-start'>
            <div className='w-1/2'>
              <Title>Details</Title>
              <Text className='text-axone-khaki'>
                Ubik Capital secures major proof of stake networks and is a trusted staking provider with years of industry experience. By delegating to us, you agree to the Terms of Service at: https://ubik.capital
              </Text>
            </div>
            <div className='w-1/2'>
              <Title>Security Contact</Title>
              <Text className='text-axone-khaki'>https://example.com</Text>
            </div>
          </div>
        </BoxInner>

        <BoxInner className='flex-col p-6 mb-4'>
          <Row className='justify-between items-center mb-4'>
            <Title>Uptime</Title>
            <Title className='text-axone-grey font-normal tracking-tighter'>Last 60 Blocks</Title>
          </Row>
          <div className='flex flex-row flex-wrap gap-2 mb-6'>
            {
              Array.from({ length: 60 }).map((_, index) => {
                return <UptimeBlockItem type={index === 5 || index === 38 ? 'proposed' : index === 40 ? 'missed' : 'signed'} key={index} />;
              })
            }
          </div>
          <Row className='justify-between items-center'>
            <div className='flex justify-start gap-4 w-2/4'>
              <Row className='items-center gap-2'><UptimeBlockItem size='small' type='proposed' /><Text className='mb-0'>Proposed: 1</Text></Row>
              <Row className='items-center gap-2'><UptimeBlockItem size='small' type='signed' /><Text className='mb-0'>Signed: 59</Text></Row>
              <Row className='items-center gap-2'><UptimeBlockItem size='small' type='missed' /><Text className='mb-0'>Missed: 0</Text></Row>
            </div>
            <Text>Current: 66,283,377</Text>
          </Row>
        </BoxInner>
      </Box>
      <DelegateModal isOpen={isDelegateOpen} setOpen={setIsDelegateOpen} />
    </PageContainer>
  );
}
