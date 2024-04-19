import Column from '@/components/ui/column';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import CurrentSupplyBlock from './_components/current-sypply-block';
import GovernanceBlock from './_components/governance-block';
import OverviewBlock from './_components/overview-block';
import StakingRewardsBlock from './_components/staking-rewards';
import SupplyChangeBlock from './_components/supply-change-block';


export default function Dashboard () {
  return (
    <PageContainer>
      <Row>
        <StakingRewardsBlock />
        <GovernanceBlock />
      </Row>

      <Row className='p-6 pt-0'>
        <OverviewBlock />

        <Column className='w-1/3 desktop:w-[500px] '>
          <SupplyChangeBlock />
          <CurrentSupplyBlock />
        </Column>
      </Row>
    </PageContainer>
  );
}
