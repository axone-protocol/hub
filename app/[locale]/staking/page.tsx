import PageContainer from '@/components/ui/page-container';
import { StakingBlock } from './_components/staking-block';
import { StakingOverviewBlock } from './_components/staking-overview-block';
import { ValidatorsBlock } from './_components/validators-block';

export default function Staking () {
  return (
    <PageContainer>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6'>
        <StakingOverviewBlock />
      </div>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6 pt-0'>
        <StakingBlock />
      </div>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6 pt-0'>
        <ValidatorsBlock />
      </div>
    </PageContainer>
  );
}
