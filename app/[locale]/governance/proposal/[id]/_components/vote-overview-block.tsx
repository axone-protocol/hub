import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box, BoxInner } from '@/components/ui/boxes';

type GradientColors = {
  start: string;
  end: string;
};

type ProgressBarProps =  {
  percentage: number;
  filledGradient: GradientColors;
  color?: string;
  showEndLine?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, filledGradient, color = '#ffffff', showEndLine = false }) => {
  return (
    <div className='relative w-full h-[4px] rounded-md'>
      <div className='absolute w-full h-full rounded-md' style={{ backgroundColor: color }}></div>
      <div className='absolute h-full rounded-md' style={{ width: `${percentage}%`, background: `linear-gradient(to right, ${filledGradient.start}, ${filledGradient.end})` }}></div>
      {showEndLine && <div className='absolute rounded-md top-[2px] bottom-0 w-[4px] h-5 bg-white' style={{ right: `${100 - (percentage - 2)}%`, marginTop: '-10px' }}></div>}
    </div>
  );
};

const VoteOverviewBlock = () => {
  return (
    <Box className='lg:mx-0'>
      <Title className='mb-6'>Vote Overview</Title>
      <div className='flex flex-col lg:flex-row gap-8'>
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>32.2%</Title>
          <div className='flex flex-row w-full justify-end items-center'>
            <Text className='text-axone-khaki mb-0'>Quorum has been reached</Text>
          </div>
          <ProgressBar percentage={82.2} showEndLine={true} filledGradient={{ end: '#35C2C3', start: '#3598C2' }} />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-axone-khaki mb-0 uppercase'>Quorum</Text>
            <AxoneTooltip iconColor='text-axone-grey' content='Some content'  />
          </div>
        </BoxInner>
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>52.2%</Title>
          <div className='flex flex-row w-full justify-between items-center'>
            <div className='flex flex-row gap-2'>
              <div className='w-4 h-4 bg-axone-light-blue-2 rounded-[3px]' />
              <Text className='text-axone-khaki mb-0'>64.24% yes</Text>
            </div>
            <div className='flex flex-row gap-2'>
              <div className='w-4 h-4 bg-axone-red rounded-[3px]' />
              <Text className='text-axone-khaki mb-0'>18.24% no</Text>
            </div>
          </div>
          <ProgressBar percentage={32.2} filledGradient={{ start: '#35C2C3', end: '#3598C2' }} color='#DC4E4E' />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-axone-khaki mb-0 uppercase'>Threshold</Text>
            <AxoneTooltip iconColor='text-axone-grey' content='Some content'  />
          </div>
        </BoxInner>
        <BoxInner className='flex-col w-full lg:w-1/3 h-40 justify-center items-center gap-4 px-6'>
          <Title>4 Days</Title>
          <div className='flex flex-row w-full justify-end items-center'>
            <Text className='text-axone-khaki mb-0 text-right'>Closing on Apr 18 2024 04:02:10</Text>
          </div>
          <ProgressBar percentage={82.2} filledGradient={{ end: '#35C2C3', start: '#3598C2' }} />
          <div className='flex flex-row justify-center items-center gap-2'>
            <Text className='text-axone-khaki mb-0 uppercase'>Voting period</Text>
            <AxoneTooltip iconColor='text-axone-grey' content='Some content'  />
          </div>
        </BoxInner>
      </div>
    </Box>
  );
};

export { VoteOverviewBlock };