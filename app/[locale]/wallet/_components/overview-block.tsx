'use client';
import { useMemo } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useMyStakingOverview } from '@/hooks/use-my-staking-overview';
import { useTokenInfo } from '@/hooks/use-token-info';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';

const OverviewBlock = () => {
  const { balance, isFetchingBalance, balanceDenom } = useAxonePayments();
  const { data: tokenInfo } = useTokenInfo();
  const { data: stakingOverview } = useMyStakingOverview();

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

    return balance.toNumber() * tokenInfo.price.value;
  }, [balance, tokenInfo]);

  const myStakedAmountInFiat = useMemo(() => {
    if (!tokenInfo) {
      return 0;
    }

    return stakeAmount * tokenInfo.price.value;
  }, [stakeAmount, tokenInfo]);

  return (
    <Box className='lg:mx-0 mb-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>Overview</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0 uppercase'>
            {isFetchingBalance ? '0.00' : balance.toNumber().toFixed(3)} {balanceDenom || 'Axone'}
          </Title>
          <Text className='uppercase text-axone-orange'>
              ${myBallanceInFiat.toFixed(2)}
          </Text>
          <Text className='uppercase text-axone-khaki'>
              My balance
          </Text>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0 uppercase'>
            {stakeAmount.toFixed(3)} {balanceDenom || 'Axone'}
          </Title>
          <Text className='uppercase text-axone-orange'>
              ${myStakedAmountInFiat.toFixed(2)}
          </Text>
          <Text className='uppercase text-axone-khaki'>
              My staked amount
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { OverviewBlock };