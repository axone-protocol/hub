import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import { BlocksBlock } from './_components/blocks-block';
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

      <div className='flex flex-col xl:flex-row lg:gap-6 p-6 py-0 '>
        <OverviewBlock />
        <div className='flex flex-col w-full lg:flex-row lg:gap-6 lg:items-stretch xl:flex-col xl:w-1/3 desktop:w-[450px] mt-6 xl:mt-0'>
          <BlocksBlock />
        </div>
      </div>

      <div className='flex flex-col xl:flex-row lg:gap-6 p-6 pt-0 lg:pt-6 '>
        <div className='flex flex-col w-full lg:flex-row lg:gap-6 lg:items-stretch xl:flex-col xl:w-1/3 desktop:w-[450px] my-6 lg:mb-0 xl:mt-0'>
          <SupplyChangeBlock />
          <CurrentSupplyBlock />
        </div>
        <SupplyRateBlock />
      </div>

      <Row className='mobile:flex-col p-6 pt-0 '>
        <ThreeBarsBlock />
      </Row>
    </PageContainer>
  );
}
