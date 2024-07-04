'use client';
import { differenceInCalendarDays, differenceInMilliseconds, isPast, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box, BoxInner } from '@/components/ui/boxes';
import { useProposalStore } from '@/hooks/use-single-proposal-info';
import { formatTimestamp } from '@/lib/utils';
import { ProgressBar } from './progress-bar';

const calculateDaysLeft = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const daysDifference = differenceInCalendarDays(endDate, startDate);

  return daysDifference;
};

const calculateIsVotingEnded = (end: string): boolean => {
  const endDate = new Date(end);
  const votingEnded = isPast(endDate);

  return votingEnded;
};

const calculatePercentageLeft = (start: string, end: string): number => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  const now = new Date();

  const totalDuration = differenceInMilliseconds(endDate, startDate);
  const timeLeft = differenceInMilliseconds(endDate, now);
  const percentageLeft = Math.max(0, (timeLeft / totalDuration) * 100);

  return percentageLeft;
};

const VoteOverviewBlock = () => {
  const t = useTranslations('Governance');
  const voteOverview = useProposalStore((state) => state.proposalData?.proposal.voteOverview);
  const vote = useProposalStore((state) => state.proposalData?.proposal.vote);

  if (!voteOverview) {
    return null;
  }
  const votingPeriod = calculateDaysLeft(voteOverview.votingPeriod.start, voteOverview.votingPeriod.end);
  const votingEnded = calculateIsVotingEnded(voteOverview.votingPeriod.end);
  const percentageLeft = calculatePercentageLeft(voteOverview.votingPeriod.start, voteOverview.votingPeriod.end);

  return (
    <Box className='w-full m-0'>
      <Title className='mb-6'>{t('VoteOverview')}</Title>
      <div className='flex flex-col lg:flex-row gap-8'>

        {/* QUORUM */}
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>{Number(voteOverview.quorum)}%</Title>
          <div className='flex flex-row w-full justify-end items-center'>
            <Text className='text-axone-khaki mb-0'>{t('QuorumReached')}</Text>
          </div>
          <ProgressBar
            percentage={Number(voteOverview.quorum)}
            showEndLine={true}
            filledGradient={{ end: '#35C2C3', start: '#3598C2' }}
          />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text
              className='text-axone-khaki mb-0 uppercase'
            >
              Quorum
            </Text>
            <AxoneTooltip iconColor='text-axone-grey' content={t('QuorumTooltip')}  />
          </div>
        </BoxInner>

        {/* THRESHOLD */}
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>{voteOverview.threshold}%</Title>
          <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex flex-row gap-2'>
              <div className='w-4 h-4 bg-axone-light-blue-2 rounded-[3px]' />
              <Text className='text-axone-khaki mb-0'>{vote?.tallyInPercents.yes}% yes</Text>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='w-4 h-4 bg-axone-red rounded-[3px]' />
              <Text className='text-axone-khaki mb-0'>{vote?.tallyInPercents.no}% no</Text>
            </div>
          </div>
          <ProgressBar
            percentage={Number(voteOverview.threshold)}
            filledGradient={{ start: '#35C2C3', end: '#3598C2' }}
            color='#DC4E4E'
          />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-axone-khaki mb-0 uppercase'>{t('Threshold')}</Text>
            <AxoneTooltip iconColor='text-axone-grey' content={t('ThresholdTooltip')}  />
          </div>
        </BoxInner>

        {/* VOTING PERIOD */}
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>{votingPeriod} Day{votingPeriod > 1 ? 's' : ''}</Title>
          <div className='flex flex-row w-full justify-end items-center'>
            <Text className='text-axone-khaki mb-0 text-right'>
              {
                votingEnded
                  ? `Voting finished ${formatTimestamp(voteOverview.votingPeriod.end)}`
                  : `Closing on ${formatTimestamp(voteOverview.votingPeriod.end)}`
              }
            </Text>
          </div>
          <ProgressBar
            percentage={percentageLeft === 0 ? 100 : percentageLeft}
            filledGradient={{ end: '#35C2C3', start: '#3598C2' }}
          />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-axone-khaki mb-0 uppercase'>{t('VotingPeriod')}</Text>
            <AxoneTooltip iconColor='text-axone-grey' content={t('VotingPeriodTooltip')}  />
          </div>
        </BoxInner>
      </div>
    </Box>
  );
};

export { VoteOverviewBlock };