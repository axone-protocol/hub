'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useAxoneToasts } from '@/hooks/use-axone-toasts';
import { useCurrencyStore } from '@/hooks/use-currencies';
import { useMyStakingOverview } from '@/hooks/use-my-staking-overview';
import { useTokenInfo } from '@/hooks/use-token-info';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { DEFAULT_TOKEN_DENOM } from '@/lib/utils';

const OverviewBlock = () => {
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  const currencySign = useCurrencyStore((state) => state.currencySign);
  const { balance, isFetchingBalance } = useAxonePayments();
  const { data: tokenInfo, isError, isLoadingError } = useTokenInfo();
  const { data: stakingOverview } = useMyStakingOverview();
  const t = useTranslations('Wallet');
  const { showErrorToast } = useAxoneToasts();

  const stakeAmount = useMemo(() => {
    if (!stakingOverview || Object.keys(stakingOverview).length === 0 ||  isNaN(Number(stakingOverview.stakedAmount))) {
      return 0;
    }
    return Number(stakingOverview.stakedAmount)/1000000;
  }, [stakingOverview]);

  const myBallanceInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }
    const tokenPrice = tokenInfo.price.value * exchangeRate;

    return balance.toNumber() * tokenPrice;
  }, [balance, exchangeRate, tokenInfo]);

  const myStakedAmountInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }
    const tokenPrice = tokenInfo.price.value * exchangeRate;

    return stakeAmount * tokenPrice;
  }, [exchangeRate, stakeAmount, tokenInfo]);

  useEffect(() => {
    if (isLoadingError || isError) {
      showErrorToast('Something went wrong. Please try again later.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingError, isError]);

  return (
    <Box className='w-full m-0 lg:mx-0 lg:mt-0 lg:mb-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40 ant'>
          {t('Overview')}
        </Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <p className='mt-2 mb-0 uppercase text-20'>
            {isFetchingBalance ? '0.00' : balance.toNumber().toFixed(3)} {DEFAULT_TOKEN_DENOM}
          </p>
          <Text className='uppercase text-axone-orange'>
            {currencySign}{myBallanceInFiat.toFixed(2)}
          </Text>
          <Text className='uppercase text-axone-khaki'>
            {t('MyBalance')}
          </Text>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <p className='mt-2 mb-0 uppercase text-20'>
            {stakeAmount.toFixed(3)} {DEFAULT_TOKEN_DENOM}
          </p>
          <Text className='uppercase text-axone-orange'>
            {currencySign}{myStakedAmountInFiat.toFixed(2)}
          </Text>
          <Text className='uppercase text-axone-khaki'>
            {t('MyStakedAmount')}
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { OverviewBlock };