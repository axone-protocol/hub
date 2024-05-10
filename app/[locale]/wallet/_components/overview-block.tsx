'use client';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useBallance } from '@/hooks/wallet/use-ballance';

const OverviewBlock = () => {
  const { balance, isFetchingBalance, balanceDenom } = useBallance();
  return (
    <Box className='lg:mx-0 mb-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>Overview</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0 uppercase'>{isFetchingBalance ? '0.00' : balance.toNumber()} {balanceDenom || 'Axone'}</Title>
          <Text className='uppercase text-axone-orange'>
              $0.00
          </Text>
          <Text className='uppercase text-axone-khaki'>
              My ballance
          </Text>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-full lg:w-1/4 h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>0.00 AXONE</Title>
          <Text className='uppercase text-axone-orange'>
              $0.00
          </Text>
          <Text className='uppercase text-axone-khaki'>
              My staked amount
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
};

export { OverviewBlock };