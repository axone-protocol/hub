'use client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useSingleProposalVotersInfo } from '@/hooks/use-single-proposal-voters';
import { NoVotersFound } from './no-voters-found';

const VotersBlock = () => {
  const t = useTranslations('Governance');
  const { id } = useParams();
  const { data, showMore, isLoading, isFetching, isRefetching } = useSingleProposalVotersInfo(id);

  if (isLoading || isFetching || isRefetching) {
    return (
      <Box className='w-full lg:w-1/2 m-0'>
        <Title className='mb-6'>{t('Voters')}</Title>
        <BoxInner className='flex-col h-[500px] justify-center items-center'>
          <Spinner />
        </BoxInner>
      </Box>
    );
  }
  if (data.voters && data.voters.length === 0) {
    return <NoVotersFound title={t('Voters')} />;
  }
  return (
    <Box className='w-full lg:w-1/2 m-0'>
      <Title className='mb-6'>{t('Voters')}</Title>
      <div className='flex flex-row justify-between items-center'>
        <Text className='text-axone-grey'>{t('Voter')}</Text>
        <Text className='text-axone-grey'>{t('VoteOptions')}</Text>
      </div>
      <BoxInner className='flex-col h-[400px] overflow-y-auto scrollbar scrollbar-thin'>
        {
          data.voters.map(({ voter, option }, index) => (
            <Row key={`${voter}/${index}`} className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
              <Text className='text-axone-grey mb-0'>{voter}</Text>
              <Text className='text-axone-grey mb-0'>{option}</Text>
            </Row>
          ))
        }
      </BoxInner>
      {
        data.pagination.total > 1
          ? (
            <Button onClick={showMore} variant='rounded' className='mt-8 px-12'>{t('ShowMore')}</Button>
          ) : null
      }
    </Box>
  );
};

export { VotersBlock };