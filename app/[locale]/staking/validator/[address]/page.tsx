import PageContainer from '@/components/ui/page-container';
import { MyDelegationInfoBlock } from './_components/my-delegation-info-block';
import { RecentlyProposedBlock } from './_components/recently-proposed-block';
import { UptimeBlock } from './_components/uptime-block';
import { ValidatorDetailsBlock } from './_components/validator-datails-block';
import { ValidatorDelegationsBlock } from './_components/validator-delegations-block';

export default function ValidatorDetails () {
  return (
    <PageContainer>
      <ValidatorDetailsBlock />
      <UptimeBlock />
      <div className='flex flex-col lg:flex-row px-6 gap-6 mt-6 mb-6'>
        <MyDelegationInfoBlock />
        <div className='flex flex-col gap-6 flex-grow'>
          <ValidatorDelegationsBlock />
          <RecentlyProposedBlock />
        </div>
      </div>
    </PageContainer>
  );
};
