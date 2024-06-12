'use client';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Row from '@/components/ui/row';
import { useTokenInfo } from '@/hooks/use-token-info';

type RewardsCalculatorModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const MIN_STAKE = 5;
const MAX_STAKE = 200000;

const RewardsCalculatorModal: FC<RewardsCalculatorModalProps> = ({ isOpen, setOpen }) => {
  const t  = useTranslations('Dashboard');
  const [stake, setStake] = useState<number>(5);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [yearly, setYearly] = useState<number>(0);
  const [monthly, setMonthly] = useState<number>(0);
  const [daily, setDaily] = useState<number>(0);
  const { data: tokenInfo } = useTokenInfo();

  const handleApplyClick = () => {
    let adjustedStake = stake;
    if (stake  < MIN_STAKE) {
      adjustedStake = MIN_STAKE;
      setStake(MIN_STAKE);
    }
    if (stake > MAX_STAKE) {
      adjustedStake = MAX_STAKE;
      setStake(MAX_STAKE);
    }
    const yearlyCalc = adjustedStake * (Number(tokenInfo?.apr || 0)/100);
    setYearly(yearlyCalc);
    setMonthly(yearlyCalc / 12);
    setDaily(yearlyCalc / 365);
  };

  const calculateFiatValue = (tokens: number): string => {
    const price = tokenInfo?.price.value || 1;
    return (tokens * price).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true);
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      setStake(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
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
                  autoFocus={false}
                  isRequired
                  onChange={handleInputChange}
                  value={isFocused ? stake : ''}
                  className='pl-2 pr-20 placeholder:tracking-tighter placeholder:text-[14px] mb-4 lg:mb-0'
                  placeholder={'Enter Amount'}
                />
                <Button
                  onClick={handleApplyClick}
                  className='bg-axone-orange text-axone-dark-blue absolute right-0'
                >
                  {t('Apply')}
                </Button>
              </Row>
              <Row className='gap-4 items-end mt-6'>
                <Info className='text-axone-khaki' size={18} />
                <Text className='text-axone-khaki mb-0 relative top-[2px]'>Min 5 - Max 200,000,000</Text>
              </Row>
            </Column>

            <Column className='w-full lg:w-1/3'>
              <Title className='font-normal text-white lg:mb-5'>APR</Title>
              <p className='text-40 text-white font-bold tracking-tighter -mt-2'>
                +{Number(tokenInfo?.apr || 0).toFixed(2)}%
              </p>
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
  );
};

export { RewardsCalculatorModal };