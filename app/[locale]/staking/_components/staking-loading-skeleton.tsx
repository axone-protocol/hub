import { Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';

const StakingLoadingSkeleton = ({ title }: { title: string }) => {
  return (
    <Box className='w-full m-0'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='lg:mr-40 mr-0'>{title}</Title>
      </Row>
      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <BoxInner key={index} className='py-5 w-full lg:w-1/4 h-36 flex-col justify-center items-center px-6'>
            <Spinner />
          </BoxInner>
        ))}
      </div>
    </Box>
  );
};

export { StakingLoadingSkeleton };