import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';

const RecentlyProposedBlock = () => {
  return (
    <Box className='m-0'>
      <Row className='justify-between items-center mb-6'>
        <Title>Recently Proposed Blocks</Title>
      </Row>
      <Row className='px-6 justify-between mb-3'>
        <Text className='w-1/4 text-white mb-0 text-left'>Height</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>Block Hash</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>TXS</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>Time</Text>
      </Row>
      <BoxInner className='flex flex-col h-[140px] overflow-y-auto scrollbar scrollbar-thin'>
        <Row className='p-6 justify-between'>
          <Text className='w-1/3 text-axone-orange mb-0 text-left'>123123424</Text>
          <Text className='w-1/3 text-axone-orange mb-0 text-left'>inj18y...yrtg8x</Text>
          <Text className='w-1/3 text-axone-khaki mb-0 text-left'>18</Text>
          <Text className='w-1/3 text-axone-khaki mb-0 text-left'>12 seconds ago</Text>
        </Row>
        <Row className='p-6 justify-between bg-axone-dark-blue-3'>
          <Text className='w-1/3 text-axone-orange mb-0 text-left'>34342432</Text>
          <Text className='w-1/3 text-axone-orange mb-0 text-left'>inj18y...yrtg8x</Text>
          <Text className='w-1/3 text-axone-khaki mb-0 text-left'>18</Text>
          <Text className='w-1/3 text-axone-khaki mb-0 text-left'>12 seconds ago</Text>
        </Row>
      </BoxInner>
    </Box>
  );
};

export { RecentlyProposedBlock };