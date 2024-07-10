'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Text, Title } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { useAxoneToasts } from '@/hooks/use-axone-toasts';
import { useGovernanceOverview } from '@/hooks/use-governance-overview';
import { ProposalsMetricsSkeleton } from './proposals-metrics-skeleton';

const ProposalsMetricsBlock = ({ goToNewProposal }: { goToNewProposal(): void }) => {
  const { data: governanceOverview, isFetching, isLoading, isLoadingError, isError } = useGovernanceOverview();
  const t = useTranslations('Governance');
  const { showErrorToast } = useAxoneToasts();

  useEffect(() => {
    if (isLoadingError || isError) {
      showErrorToast('Something went wrong. Please try again later.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingError, isError]);

  if (!governanceOverview || isFetching || isLoading || isLoadingError || isError) {
    return <ProposalsMetricsSkeleton />;
  }
  return (
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

      <BoxInner className='py-5 w-full lg:w-1/4 h-24 items-start lg:h-30 flex-col justify-center gap-2 lg:gap-6 lg:items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview.totalProposals}
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          {t('TotalProposals')}
        </Text>
      </BoxInner>

      <BoxInner className='py-5 w-full lg:w-1/4 h-24 items-start lg:h-30 flex-col justify-center gap-2 lg:gap-6 lg:items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview.currentProposals}
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          {t('CurrentProposals')}
        </Text>
      </BoxInner>

      <BoxInner className='ppy-5 w-full lg:w-1/4 h-24 items-start lg:h-30 flex-col justify-center gap-2 lg:gap-6 lg:items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview.votingPeriod} Day {governanceOverview.votingPeriod > 1 ? 's' : ''}
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          {t('VotingPeriod')}
        </Text>
      </BoxInner>

      <BoxInner className='py-5 w-full lg:w-1/4 h-24 items-start lg:h-30 flex-col justify-center gap-2 lg:gap-6 lg:items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview.depositRequired} AXONE
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          {t('DepositRequired')}
        </Text>
      </BoxInner>
      <Button
        className='lg:hidden flex'
        variant={'rounded'}
        onClick={goToNewProposal}
      >
        {t('NewProposal')}
      </Button>
    </div>
  );
};

export { ProposalsMetricsBlock };