import PageContainer from '@/components/ui/page-container';
import { MyDelegationInfoBlock } from './_components/my-delegation-info-block';
import { RecentlyProposedBlock } from './_components/recently-proposed-block';
import { UptimeBlock } from './_components/uptime-block';
import { ValidatorDetailsBlock } from './_components/validator-datails-block';
import { ValidatorDelegationsBlock } from './_components/validator-delegations-block';

export default function ValidatorDetails () {
  return (
    <PageContainer>
      <div className='flex w-full flex-col lg:flex-row lg:w-full p-6'>
        <ValidatorDetailsBlock />
      </div>
      <div className='flex w-full flex-col lg:flex-row lg:w-full p-6 pt-0'>
        <UptimeBlock />
      </div>
      <div className='flex flex-col p-6 lg:flex-row gap-6 pt-0'>
        <MyDelegationInfoBlock />
        <div className='flex flex-col gap-6 flex-grow'>
          <ValidatorDelegationsBlock />
          <RecentlyProposedBlock />
        </div>
      </div>
    </PageContainer>
  );
};
