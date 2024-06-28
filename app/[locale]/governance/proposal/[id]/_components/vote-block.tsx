'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Spinner from '@/components/ui/spinner';
import { useProposalStore } from '@/hooks/use-single-proposal-info';
import { formatDate } from '@/lib/utils';
import { VotingPieChart } from './voting-pie-chart';

const VoteBlock = () => {
  const t = useTranslations('Governance');
  const proposalData = useProposalStore((state) => state.proposalData?.proposal);
  const totalDeposit = useProposalStore((state) => state.proposalData?.proposal.total_deposit);
  const voteData = useProposalStore((state) => state.proposalData?.proposal.vote);

  if (!totalDeposit || !voteData || !proposalData) {
    return <Box className='w-full lg:w-1/2 m-0 lg:m-0 flex justify-center items-center'><Spinner /></Box>;
  }

  const chartData = [
    { name: 'YES', value: Number(voteData.tallyInPercents.yes) },
    { name: 'NO', value: Number(voteData.tallyInPercents.no) },
  ];

  return (
    <Box className='w-full lg:w-1/2 m-0 lg:m-0'>
      <Title className='mb-6'>{t('Vote')}</Title>
      <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12'>

        <VotingPieChart data={chartData} />

        <div className='flex w-full lg:w-3/4 flex-col'>
          <Text className='mb-0'>{t('Total')}</Text>
          <div className='flex flex-col lg:flex-row items-end gap-0 lg:gap-4 mb-3'>
            <p className='text-[32px] text-axone-grey'>
              {Number(totalDeposit[0].amount) / 1000000}
            </p>
            <span className='text-[32px] text-axone-khaki uppercase'>axone</span>
          </div>
          <Text className='mb-0'>{t('VotingEnds')}</Text>
          <p className='text-20 text-axone-grey'>
            {formatDate(proposalData.voting_end_time)}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>
            {Number(voteData.tallyInPercents.yes)}%
          </Title>
          <Text className='mb-0 text-axone-light-blue-2 uppercase'>{t('Yes')}</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>
            {Number(voteData.tallyInPercents.no)}%
          </Title>
          <Text className='mb-0 text-axone-red uppercase'>{t('No')}</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>
            {Number(voteData.tallyInPercents.abstain)}%
          </Title>
          <Text className='mb-0 text-axone-khaki uppercase'>{t('Abstain')}</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>
            {Number(voteData.tallyInPercents.noWithVeto)}%
          </Title>
          <Text className='mb-0 text-axone-khaki uppercase'>{t('NoWithVeto')}</Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { VoteBlock };