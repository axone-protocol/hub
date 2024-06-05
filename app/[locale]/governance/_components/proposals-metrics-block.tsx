'use client';
import { Text, Title } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { useGovernanceOverview } from '@/hooks/use-governance-overview';
import { ProposalsMetricsSkeleton } from './proposals-metrics-skeleton';

const ProposalsMetricsBlock = () => {
  const { data: governanceOverview, isFetching } = useGovernanceOverview();

  if (!governanceOverview || isFetching) {
    return <ProposalsMetricsSkeleton />;
  }
  return (
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

      <BoxInner className='py-5 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview?.totalProposals}
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          Total proposals
        </Text>
      </BoxInner>

      <BoxInner className='py-5 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview?.currentProposals}
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          Current proposals
        </Text>
      </BoxInner>

      <BoxInner className='py-5 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview?.votingPeriod} Days
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          Voting period
        </Text>
      </BoxInner>

      <BoxInner className='py-5 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Title className='mb-0'>
          {governanceOverview?.depositRequired} AXONE
        </Title>
        <Text className='text-axone-khaki mb-0 uppercase'>
          Deposit required
        </Text>
      </BoxInner>
    </div>
  );
};

export { ProposalsMetricsBlock };