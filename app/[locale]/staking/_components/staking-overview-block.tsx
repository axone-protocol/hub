'use client';
import { useChain } from '@cosmos-kit/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import LogoDarkMobile from '@/components/ui/logo-dark-mobile';
import Row from '@/components/ui/row';
import { useModal } from '@/context';
import { chainName } from '@/core/chain';
import { useCurrencyStore } from '@/hooks/use-currencies';
import { useMyStakingOverview } from '@/hooks/use-my-staking-overview';
import { useTokenInfo } from '@/hooks/use-token-info';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { DEFAULT_TOKEN_DENOM } from '@/lib/utils';
import { StakingLoadingSkeleton } from './staking-loading-skeleton';

const StakingOverviewBlock = () => {
  const t = useTranslations('Staking');
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  const currencySign = useCurrencyStore((state) => state.currencySign);
  const { data, isLoading, isFetching, isPending, isRefetching } = useMyStakingOverview();
  const { isWalletConnected } = useChain(chainName);
  const { openConnectWalletModal } = useModal();
  const { balance, claimAllDelegatorsRewards } = useAxonePayments();

  const { data: tokenInfo } = useTokenInfo();

  const stakeAmount = useMemo(() => {
    if (!data || Object.keys(data).length === 0 ||  isNaN(Number(data.stakedAmount))) {
      return 0;
    }
    return Number(data.stakedAmount)/1000000;
  }, [data]);

  const claimableRewards = useMemo(() => {
    if (!data || Object.keys(data).length === 0 ||  isNaN(Number(data.stakedAmount))) {
      return 0;
    }
    return Number(data.claimableReward);
  }, [data]);

  const myBallanceInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }

    const tokenPrice = tokenInfo.price.value * exchangeRate;

    return (balance.toNumber() * tokenPrice).toFixed(2);
  }, [balance, exchangeRate, tokenInfo]);

  const myStakedAmountInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }
    const tokenPrice = tokenInfo.price.value * exchangeRate;

    return (stakeAmount * tokenPrice).toFixed(2);
  }, [exchangeRate, stakeAmount, tokenInfo]);

  const myClaimableRewardsInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }
    const tokenPrice = tokenInfo.price.value * exchangeRate;

    return (claimableRewards * tokenPrice).toFixed(2);
  }, [claimableRewards, exchangeRate, tokenInfo]);

  if (!isWalletConnected) {
    return (
      <Box className='w-full m-0 relative'>
        <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
          <Title className='mr-0 lg:mr-40'>{t('YourStakingOverview')}</Title>
        </Row>
        <div className='flex flex-col w-full justify-start items-start'>
          <div className='flex flex-row items-center mb-4'>
            <div className='flex items-center gap-2 pr-4 border-r border-r-axone-box-border'>
              <LogoDarkMobile />
              <Text className='uppercase mb-0'>Axone</Text>
            </div>
            <Text className='mb-0 pl-4'>{t('ManageByConnectingWallet')}</Text>
          </div>
          <Button onClick={openConnectWalletModal} variant='rounded' className='mt-4'>{t('ConnectWallet')}</Button>
        </div>
        <div className='hidden lg:flex absolute right-0 top-0 w-[500px] h-full'>
          <Image src='/images/stBg.svg' fill={true}  alt='Staking Overview' />

        </div>
      </Box>
    );
  }
  if (isLoading || isFetching || isPending || isRefetching) {
    return (
      <StakingLoadingSkeleton title={t('YourStakingOverview')} />
    );
  };
  return (
    <Box className='w-full m-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='lg:mr-40'>{t('YourStakingOverview')}</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
            {t('YourStakedAmount')}
          </Text>
          <Title className='mb-0'>
            {stakeAmount.toFixed(3) || '0.00'} {DEFAULT_TOKEN_DENOM}
          </Title>
          <Text className='text-axone-khaki mb-0'>
            {currencySign}{myStakedAmountInFiat}
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
            {t('ClaimableRewards')}
          </Text>
          <Title className='mb-0'>
            {claimableRewards} {DEFAULT_TOKEN_DENOM}
          </Title>
          <Row className='w-full justify-between items-center'>
            <Text className='text-axone-khaki mb-0'>
              {currencySign}{myClaimableRewardsInFiat}
            </Text>
            <Button onClick={claimAllDelegatorsRewards} variant={'link'} className='mb-0 p-0 text-axone-orange h-auto'>
              {t('ClaimAll')}
            </Button>
          </Row>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
            {t('AvailableAXONEinWallet')}
          </Text>
          <Title className='mb-0'>{balance.toNumber().toFixed(3)} {DEFAULT_TOKEN_DENOM}</Title>
          <Text className='text-axone-khaki mb-0'>
            {currencySign}{myBallanceInFiat}
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-start items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
            {t('Delegations')}
          </Text>
          <Title className='mt-4 mb-0'>{data?.delegations} {t('Validators')}</Title>
        </BoxInner>
      </div>
    </Box>
  );
};

export { StakingOverviewBlock };