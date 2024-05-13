'use client';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';

const StakingOverviewBlock = () => {
  return (
    <Box className='lg:mx-0 mb-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>Your Staking Overview</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-start items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
              Delegations
          </Text>
          <Title className='mt-2 mb-0'>0 Validators</Title>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
              Your staked amount
          </Text>
          <Title className='mb-0'>0.00 AXONE</Title>
          <Text className='text-axone-khaki mb-0'>
              $0.00
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
              Claimable rewards
          </Text>
          <Title className='mb-0'>0.00 AXONE</Title>
          <Row className='justify-between items-center'>
            <Text className='text-axone-khaki mb-0'>
              $0.00
            </Text>
            <Button variant={'link'} className='mb-0 p-0 text-axone-orange h-auto'>Claim All</Button>
          </Row>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-36 flex-col justify-between items-start px-6'>
          <Text className='text-axone-khaki mb-0'>
              Available AXONE in Wallet
          </Text>
          <Title className='mb-0'>0.00 AXONE</Title>
          <Text className='text-axone-khaki mb-0'>
              $0.00
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { StakingOverviewBlock };