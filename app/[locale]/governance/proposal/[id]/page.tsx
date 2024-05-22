'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import PageContainer from '@/components/ui/page-container';
import { useModal } from '@/context';
import { ProposalParamsTable } from './_components/proposal-params-table';
import { VoteBlock } from './_components/vote-block';
import { VoteOverviewBlock } from './_components/vote-overview-block';
import { VotersBlock } from './_components/voters-block';

export default function ValidatorDetails () {
  const { id } = useParams();
  const { openVoteProposalModal } = useModal();

  return (
    <PageContainer>
      <Box className='lg:mx-0'>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-6 lg:mb-10'>
          <div className='flex flex-row items-center gap-4 w-full lg:w-1/4 my-4 lg:my-0'>
            <div className='relative border rounded-full w-[60px] h-[60px] p-2'>
              <div className='relative w-full h-full p-[5px]'>
                <Image src={'/icons/wallets/ninji.svg'} className='rounded-full' fill={true} alt='AXONE' />
              </div>
            </div>

            <div className='flex flex-col h-16 justify-between cursor-pointer'>
              <span className='w-[70px] text-center text-[12px] text-axone-khaki bg-axone-bg-dark p-1 rounded-md uppercase'>
                {'Active'}
              </span>
              <span className='text-20 text-white'>
                {'Proposal Title'}
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
            <p className='font-base font-bold text-white mb-2'>Type</p>
            <Text>Mag store code</Text>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Deposits</p>
            <Text>100.00 Axone</Text>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row mb-6 gap-6'>
          <div className='w-full lg:w-2/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Description</p>
            <Text className='pr-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</Text>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Proposer Address</p>
            <Text>axone.....ge23</Text>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row mb-6 gap-6'>
          <div className='w-full lg:w-1/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Submit Time</p>
            <Text>Apr 05 2024 13:00:00 UTC+02:00</Text>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Voting Start</p>
            <Text>Apr 05 2024 14:00:00 UTC+02:00</Text>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col'>
            <p className='font-base font-bold text-white mb-2'>Voting End</p>
            <Text>apr 09 2024 18:26:12 utc+02:00 (4 days) </Text>
          </div>
        </div>

        <ProposalParamsTable />

        <div className='flex flex-col lg:flex-row gap-6'>
          <Button
            variant='rounded'
            className='w-full lg:w-auto px-12'
            onClick={openVoteProposalModal}
          >
            Vote
          </Button>
          <ButtonWithIcon variant='noBorder' className='w-full lg:w-auto'>View JSON</ButtonWithIcon>
        </div>
      </Box>

      <VoteOverviewBlock />

      <div className='flex flex-col lg:flex-row gap-6 px-6 lg:px-0'>
        <VoteBlock />
        <VotersBlock />
      </div>
    </PageContainer>
  );
};
