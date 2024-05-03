import Column from '@/components/ui/column';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import CurrentSupplyBlock from './_components/current-sypply-block';
import GovernanceBlock from './_components/governance-block';
import OverviewBlock from './_components/overview-block';
import StakingRewardsBlock from './_components/staking-rewards';
import SupplyChangeBlock from './_components/supply-change-block';
import SupplyRateBlock from './_components/supply-rate-block';
import { ThreeBarsBlock } from './_components/three-bars-block';


export default function Dashboard () {
  return (
    <PageContainer>
      <Row className='mobile:flex-col mobile:p-6 p-0'>
        <StakingRewardsBlock />
        <GovernanceBlock />
      </Row>

      <Row className='mobile:flex-col p-6 pt-0 '>
        <OverviewBlock />

        <Column className='w-full md:w-1/3 desktop:w-[500px] mt-6 md:mt-0'>
          <SupplyChangeBlock />
          <CurrentSupplyBlock />
        </Column>
      </Row>

      <Row className='mobile:flex-col p-6 pt-0 '>
        <SupplyRateBlock />
      </Row>
      <Row className='mobile:flex-col p-6 pt-0 '>
        <ThreeBarsBlock />
      </Row>
    </PageContainer>
  );
}
