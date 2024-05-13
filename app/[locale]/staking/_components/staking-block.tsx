'use client';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';

const StakingBlock = () => {
  return (
    <Box className='lg:mx-0 mb-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>Staking</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>15.55%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
              Total Validators
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>154</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
              APR
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0 uppercase'>50,954,541.86 <span className='text-axone-khaki'>axone</span></Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
              Total Staked
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>30%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
              Bonded Tokens
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { StakingBlock };