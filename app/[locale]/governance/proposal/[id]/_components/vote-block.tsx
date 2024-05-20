'use client';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { VotingPieChart } from './voting-pie-chart';

const VoteBlock = () => {
  return (
    <Box className='w-full lg:w-1/2 m-0 lg:m-0'>
      <Title className='mb-6'>Vote</Title>
      <div className='flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-12'>
        <VotingPieChart />
        <div className='flex w-full lg:w-3/4 flex-col'>
          <Text className='mb-0'>Total</Text>
          <div className='flex flex-col lg:flex-row items-end gap-0 lg:gap-4 mb-3'>
            <p className='text-[32px] text-axone-grey'>2,847,432.80</p>
            <span className='text-[32px] text-axone-khaki uppercase'>axone</span>
          </div>
          <Text className='mb-0'>Voting Ends</Text>
          <p className='text-20 text-axone-grey'>Apr 18 2024 04:02:10 UTC+02:00 (1 day)</p>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>85.06%</Title>
          <Text className='mb-0 text-axone-light-blue-2 uppercase'>Yes</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>56.13%</Title>
          <Text className='mb-0 text-axone-red uppercase'>No</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>{'<0.01%'}</Title>
          <Text className='mb-0 text-axone-khaki uppercase'>Abstain</Text>
        </BoxInner>
        <BoxInner className='flex-col justify-center items-center gap-6 w-full h-32'>
          <Title>{'<0.01%'}</Title>
          <Text className='mb-0 text-axone-khaki uppercase'>No with veto</Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { VoteBlock };