import PageContainer from '@/components/ui/page-container';
import { StakingBlock } from './_components/staking-block';
import { StakingOverviewBlock } from './_components/staking-overview-block';
import { ValidatorsBlock } from './_components/validators-block';

export default function Staking () {
  return (
    <PageContainer>
      <StakingOverviewBlock />
      <StakingBlock />
      <ValidatorsBlock />
    </PageContainer>
  );
}
