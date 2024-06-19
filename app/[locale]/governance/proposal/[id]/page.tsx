import PageContainer from '@/components/ui/page-container';
import { ProposalOverviewBlock } from './_components/proposal-overview-block';
import { VoteBlock } from './_components/vote-block';
import { VoteOverviewBlock } from './_components/vote-overview-block';
import { VotersBlock } from './_components/voters-block';

export default async function ValidatorDetails () {
  return (
    <PageContainer>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6'>
        <ProposalOverviewBlock />
      </div>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6 pt-0'>
        <VoteOverviewBlock />
      </div>
      <div className='flex flex-col lg:flex-row gap-6 p-6 pt-0'>
        <VoteBlock />
        <VotersBlock />
      </div>
    </PageContainer>
  );
};
