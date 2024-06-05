import { BoxInner } from '@/components/ui/boxes';
import Spinner from '@/components/ui/spinner';

const ProposalsMetricsSkeleton = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
      <BoxInner className='py-8 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Spinner />
      </BoxInner>
      <BoxInner className='py-8 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Spinner />
      </BoxInner>
      <BoxInner className='py-8 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Spinner />
      </BoxInner>
      <BoxInner className='py-8 w-full lg:w-1/4 h-30 flex-col justify-center gap-6 items-center px-6'>
        <Spinner />
      </BoxInner>
    </div>
  );
};

export { ProposalsMetricsSkeleton };