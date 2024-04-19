'use client';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { ButtonWithIcon } from '../../button-with-icon';
import Column from '../../column';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import Row from '../../row';
import { Slider } from '../../slider';

const RewardsCalculatorModal = () => {
  const t  = useTranslations('Dashboard');
  const [stake, setStake] = useState<number[]>([5]);

  // Mock values - will be replaced with real values later
  const APR_MOCK = 15.66;
  const AXONE_FIAT_PRICE_MOCK = 1.23;

  const yearly = useMemo(() => stake[0] * (APR_MOCK/100), [stake]);
  const monthly = useMemo(() => yearly / 12, [yearly]);
  const daily = useMemo(() => yearly / 365, [yearly]);

  const calculateFiatValue = (tokens: number, price = AXONE_FIAT_PRICE_MOCK): string => {
    return (tokens * price).toFixed(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWithIcon variant={'link'} className='mt-5 text-axone-orange text-base font-bold z-10'>
          {t('CalculateRewards')}
        </ButtonWithIcon>
      </DialogTrigger>
      <DialogContent className='text-white'>
        <DialogHeader>
          <DialogTitle>{t('StakingRewardsCalculator')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Column>
            <Row className='justify-between mb-6'>
              <Column className='w-2/3'>
                <Title className='font-normal text-white mb-5'>{t('YourAxoneStake')}</Title>
                <p className='text-40 text-axone-orange font-bold tracking-tighter'>{stake[0]}</p>
              </Column>
              <Column className='w-1/3'>
                <Title className='font-normal text-white mb-5'>APR</Title>
                <p className='text-40 text-white font-bold tracking-tighter'>+{APR_MOCK}%</p>
              </Column>
            </Row>

            <Slider onValueChange={e => setStake(e)} className='mb-8' defaultValue={stake} max={200000} step={1} />

            <Row className='justify-between items-center border-b border-axone-box-border py-4'>
              <Title className='font-normal text-white'>{t('DailyReturns')}</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>{daily.toFixed(10)} Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(daily)}</Text>
              </div>
            </Row>
            <Row className='justify-between items-center border-b border-axone-box-border py-4'>
              <Title className='font-normal text-white'>{t('MonthlyReturns')}</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>{monthly.toFixed(10)} Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(monthly)}</Text>
              </div>
            </Row>
            <Row className='justify-between items-center py-4'>
              <Title className='font-normal text-white'>{t('YearlyReturns')}</Title>
              <div className='text-right'>
                <Text className='font-normal text-axone-khaki mb-1'>{yearly.toFixed(10)} Axone</Text>
                <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(yearly)}</Text>
              </div>
            </Row>
          </Column>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );};

export default RewardsCalculatorModal;