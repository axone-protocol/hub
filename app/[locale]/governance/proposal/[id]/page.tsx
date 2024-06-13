import PageContainer from '@/components/ui/page-container';
import { ProposalOverviewBlock } from './_components/proposal-overview-block';
import { VoteBlock } from './_components/vote-block';
import { VoteOverviewBlock } from './_components/vote-overview-block';
import { VotersBlock } from './_components/voters-block';

export default async function ValidatorDetails () {
  return (
    <PageContainer>
      <ProposalOverviewBlock />
      <VoteOverviewBlock />
      <div className='flex flex-col lg:flex-row gap-6 px-6 lg:px-0'>
        <VoteBlock />
        <VotersBlock />
      </div>
    </PageContainer>
  );
};
