'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { ButtonWithIcon } from '../../button-with-icon';
import Column from '../../column';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import Row from '../../row';
import { Slider } from '../../slider';

const ConnectWalletModal = () => {
  const t  = useTranslations('Dashboard');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWithIcon variant={'link'} className='mt-5 text-axone-orange text-base font-bold'>
          {t('CalculateRewards')}
        </ButtonWithIcon>
      </DialogTrigger>
      <DialogContent className='text-white'>
        <DialogHeader>
          <DialogTitle>Staking Rewards Calculator</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Column>
            <Row className='justify-between mb-6'>
              <Column className='w-2/3'>
                <Title className='font-normal text-white mb-5'>Your Axone Stake</Title>
                <p className='text-40 text-axone-orange font-bold tracking-tighter'>10</p>
              </Column>
              <Column className='w-1/3'>
                <Title className='font-normal text-white mb-5'>APR</Title>
                <p className='text-40 text-white font-bold tracking-tighter'>+15.66%</p>
              </Column>
            </Row>

            {/* Slider */}
            <Slider className='mb-8' defaultValue={[33]} max={100} step={1} />

            <Row className='justify-between items-center border-b border-axone-box-border py-4'>
              <Title className='font-normal text-white'>Daily Returns</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>0.00 Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>$0.14</Text>
              </div>
            </Row>
            <Row className='justify-between items-center border-b border-axone-box-border py-4'>
              <Title className='font-normal text-white'>Monthly Returns</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>0.00 Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>$0.14</Text>
              </div>
            </Row>
            <Row className='justify-between items-center py-4'>
              <Title className='font-normal text-white'>Yearly Returns</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>0.00 Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>$0.14</Text>
              </div>
            </Row>
          </Column>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );};

export default ConnectWalletModal;