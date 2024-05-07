'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Row from '@/components/ui/row';

const RewardsCalculatorModal = () => {
  const t  = useTranslations('Dashboard');
  const [stake, setStake] = useState<number>(5);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [yearly, setYearly] = useState<number>(0);
  const [monthly, setMonthly] = useState<number>(0);
  const [daily, setDaily] = useState<number>(0);

  // Mock values - will be replaced with real values later
  const APR_MOCK = 15.66;
  const AXONE_FIAT_PRICE_MOCK = 1.23;

  const handleApplyClick = () => {
    const yearlyCalc = stake * (APR_MOCK/100);
    setYearly(yearlyCalc);
    setMonthly(yearlyCalc / 12);
    setDaily(yearlyCalc / 365);
  };

  const calculateFiatValue = (tokens: number, price = AXONE_FIAT_PRICE_MOCK): string => {
    return (tokens * price).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true);
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      if (value < 5) {
        setStake(5);
      } else if (value > 200000) {
        setStake(200000);
      } else {
        setStake(value);
      }
    }
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <ButtonWithIcon variant={'link'} className='mt-5 text-axone-orange text-base font-bold z-8'>
          {t('CalculateRewards')}
        </ButtonWithIcon>
      </DialogTrigger>

      <DialogContent className='text-white p-6 pb-0 lg:p-10 w-[85vw] lg:w-[50vw]'>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>{t('StakingRewardsCalculator')}</DialogTitle>
        </DialogHeader>

        <Column>
          <div className='flex flex-col lg:flex-row justify-between lg:mb-6'>

            <Column className='w-full lg:w-2/3 lg:mr-5'>
              <Title className='font-normal text-white lg:mb-5'>{t('YourAxoneStake')}</Title>
              <Row className='relative'>
                <Input
                  type='number'
                  min='5'
                  max='200000'
                  autoFocus={false}
                  isRequired
                  onChange={handleInputChange}
                  value={isFocused ? stake : ''}
                  className='pl-2 pr-20 placeholder:tracking-tighter placeholder:text-[14px] mb-4 lg:mb-0'
                  placeholder={t('StakingRewardsCalculatorEnterAmount')}
                />
                <Button
                  onClick={handleApplyClick}
                  className='bg-axone-orange text-axone-dark-blue absolute right-0'
                >
                  {t('Apply')}
                </Button>
              </Row>
            </Column>

            <Column className='w-full lg:w-1/3'>
              <Title className='font-normal text-white lg:mb-5'>APR</Title>
              <p className='text-40 text-white font-bold tracking-tighter -mt-2'>+{APR_MOCK}%</p>
            </Column>

          </div>

          <Row className='justify-between items-center border-b border-axone-box-border py-3 lg:py-4'>
            <Title className='font-normal text-white'>{t('DailyReturns')}</Title>
            <div className='text-right flex flex-col'>
              <Text className='font-normal text-axone-khaki mb-1'>{daily.toFixed(10)} Axone</Text>
              <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(daily)}</Text>
            </div>
          </Row>

          <Row className='justify-between items-center border-b border-axone-box-border py-3 lg:py-4'>
            <Title className='font-normal text-white'>{t('MonthlyReturns')}</Title>
            <div className='text-right  flex flex-col'>
              <Text className='font-normal text-axone-khaki mb-1'>{monthly.toFixed(10)} Axone</Text>
              <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(monthly)}</Text>
            </div>
          </Row>

          <Row className='justify-between items-center py-3 lg:py-4'>
            <Title className='font-normal text-white'>{t('YearlyReturns')}</Title>
            <div className='text-right flex flex-col'>
              <Text className='font-normal text-axone-khaki mb-1'>{yearly.toFixed(10)} Axone</Text>
              <Text className='font-normal text-axone-khaki mb-0'>${calculateFiatValue(yearly)}</Text>
            </div>
          </Row>

        </Column>
      </DialogContent>
    </Dialog>
  );};

export default RewardsCalculatorModal;