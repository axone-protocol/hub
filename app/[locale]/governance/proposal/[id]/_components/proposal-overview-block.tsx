'use client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context';
import { useSingleProposalInfo } from '@/hooks/use-single-proposal-info';
import { formatDate } from '@/lib/utils';
import { ProposalImage } from './proposal-image';

const ProposalOverviewBlock = () => {
  const { id } = useParams();
  const { openVoteProposalModal } = useModal();
  const { data } = useSingleProposalInfo(id);
  const t = useTranslations('Governance');

  return (
    <Box className='w-full m-0'>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-6 lg:mb-10'>
        <div className='flex flex-row items-center gap-4 w-full lg:w-1/4 my-4 lg:my-0'>
          <div className='w-16 h-16'>
            <ProposalImage />
          </div>

          <div className='flex flex-col h-16 justify-between cursor-pointer'>
            <span className='w-[70px] text-center text-[12px] text-axone-khaki bg-axone-bg-dark p-1 rounded-md uppercase'>
              {'Active'}
            </span>
            <span className='text-20 text-white'>
              { data?.proposal.title || 'Proposal Title' }
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row mb-6 gap-6'>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>ID</p>
          <Text>Prop {id || 0}</Text>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('Type')}</p>
          <Text>{ data?.proposal.messages[0]['@type'] || '...' }</Text>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('Deposits')}</p>
          <Text>{ Number(data?.proposal.total_deposit[0].amount) / 1000000 || '0.00' } Axone</Text>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row mb-6 gap-6'>
        <div className='w-full lg:w-2/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('Description')}</p>
          <Text className='pr-4'>
            { data?.proposal.summary || 'Proposal Title' }
          </Text>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('ProposerAddress')}</p>
          <Text>{ data?.proposal.proposer || '...' }</Text>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row mb-6 gap-6'>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('SubmitTime')}</p>
          <Text>
            { formatDate(data?.proposal.submit_time) || '...' }
          </Text>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('VotingStarts')}</p>
          <Text>
            { formatDate(data?.proposal.voting_start_time) || '...' }
          </Text>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <p className='font-base font-bold text-white mb-2'>{t('VotingEnds')}</p>
          <Text>
            { formatDate(data?.proposal.voting_end_time) || '...' }
          </Text>
        </div>
      </div>

      {/* <ProposalParamsTable /> */}

      <div className='flex flex-col lg:flex-row gap-6'>
        <Button
          variant='rounded'
          className='w-full lg:w-auto px-12'
          onClick={() => openVoteProposalModal({ proposalTitle: data?.proposal.title || '' })}
        >
          {t('Vote')}
        </Button>
        {/* <ButtonWithIcon variant='noBorder' className='w-full lg:w-auto'>
          {t('ViewJson')}
        </ButtonWithIcon> */}
      </div>
    </Box>
  );
};

export { ProposalOverviewBlock };
