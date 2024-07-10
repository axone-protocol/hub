import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';

const RewardsHistoryLoadingBlock: React.FC = () => {
  return (
    <Box className='w-full mt-0 mb-0 mx-0 lg:mx-0'>
      <div className='flex flex-row justify-between mb-6 lg:items-center'>
        <Title>My Rewards History</Title>
      </div>

      <div className='flex flex-col w-full overflow-auto'>
        <Row className='justify-between w-[900px] lg:w-full '>
          <Text className='w-1/6'>Tx hash</Text>
          <Text className='w-1/6'>Result</Text>
          <Text className='w-1/6'>Message</Text>
          <Text className='w-1/6'>Amount</Text>
          <Text className='w-1/6'>Time</Text>
        </Row>

        <BoxInner className='flex-col w-[900px] h-64 lg:h-[600px] justify-center items-center lg:w-full  pb-4 mb-4'>
          <Spinner />
        </BoxInner>
      </div>
    </Box>
  );
};

export { RewardsHistoryLoadingBlock };