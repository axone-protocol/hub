import { BoxInner } from '@/components/ui/boxes';
import Spinner from '@/components/ui/spinner';

const MetricsLoadingSkeleton = () => {
  return (
    <>
      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-center items-center'>
        <Spinner />
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-center items-center'>
        <Spinner />
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-center items-center'>
        <Spinner />
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-center items-center'>
        <Spinner />
      </BoxInner>
    </>
  );
};

export { MetricsLoadingSkeleton };