'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useStakingOverview } from '@/hooks/use-staking-overview';
import { formatNumberToLocale } from '@/lib/utils';
import { StakingLoadingSkeleton } from './staking-loading-skeleton';

const StakingBlock = () => {
  const t = useTranslations('Staking');
  const { data, isLoading, isFetching, isPending, isRefetching } = useStakingOverview();
  const totalStaked = formatNumberToLocale(Number(data?.totalStaked));

  if (isLoading || isFetching || isPending || isRefetching) {
    return (
      <StakingLoadingSkeleton title={t('Staking')} />
    );
  };
  return (
    <Box className='w-full m-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>{t('Staking')}</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{data?.totalValidators}</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            {t('TotalValidators')}
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{data?.apr}%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
              APR
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <div className='flex flex-col items-end'>
            <Title className='mt-2 mb-0 uppercase'>{totalStaked}</Title>
            <span className='text-axone-khaki uppercase'>know</span>
          </div>
          <Text className='text-axone-khaki mb-0 uppercase'>
            {t('TotalStaked')}
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{data?.bondedTokens}%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            {t('BondedTokens')}
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { StakingBlock };