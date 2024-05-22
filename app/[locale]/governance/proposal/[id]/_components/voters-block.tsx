import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';

const VotersBlock = () => {
  return (
    <Box className='w-full lg:w-1/2 m-0'>
      <Title className='mb-6'>Voters</Title>
      <div className='flex flex-row justify-between items-center'>
        <Text className='text-axone-grey'>Voter</Text>
        <Text className='text-axone-grey'>Vote Options</Text>
      </div>
      <BoxInner className='flex-col h-[400px] overflow-y-auto scrollbar scrollbar-thin'>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
        <Row className='justify-between items-center p-6 even:bg-axone-dark-blue-3'>
          <Text className='text-axone-grey mb-0'>axone.....ge23</Text>
          <Text className='text-axone-grey mb-0'>Yes</Text>
        </Row>
      </BoxInner>
      <Button variant='rounded' className='mt-8 px-12'>Show More</Button>
    </Box>
  );
};

export { VotersBlock };