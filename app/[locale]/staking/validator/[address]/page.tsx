'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { DelegateModal } from '@/components/ui/modals/delegate/delegate-modal';
import PageContainer from '@/components/ui/page-container';
import { MyDelegationInfoBlock } from './_components/my-delegation-info-block';
import { RecentlyProposedBlock } from './_components/recently-proposed-block';
import { UptimeBlock } from './_components/uptime-block';
import { ValidatorDetailsBlock } from './_components/validator-datails-block';
import { ValidatorDelegationsBlock } from './_components/validator-delegations-block';

export default function ValidatorDetails () {
  const [isDelegateOpen, setIsDelegateOpen] = useState<boolean>(false);
  const { address } = useParams();

  return (
    <PageContainer>
      <ValidatorDetailsBlock address={address} openDelegateModal={() => setIsDelegateOpen(true)} />
      <UptimeBlock />
      <div className='flex flex-col lg:flex-row px-6 gap-6 mt-6 mb-6'>
        <MyDelegationInfoBlock />
        <div className='flex flex-col gap-6 flex-grow'>
          <ValidatorDelegationsBlock address={address} />
          <RecentlyProposedBlock />
        </div>
      </div>
      <DelegateModal isOpen={isDelegateOpen} setOpen={setIsDelegateOpen} />
    </PageContainer>
  );
};
