
import { FC } from 'react';
import { Text } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';

type MockDataType = {
  min: number;
  current: number;
  max: number;
};

type OneBarChartProps = {
  width?: number;
  height?: number;
  data: MockDataType;
};

type ChartLineProps = {
  value?: number;
  position?: 'top' | 'middle' | 'bottom';
};

const ChartLine: FC<ChartLineProps> = ({ value = 0, position = 'top' }) => {
  const getClassByPosition = () => {
    if (position === 'top') {
      return '-top-[5px]';
    }
    if (position === 'bottom') {
      return '-bottom-[5px]';
    }
    return 'top-[80px]';
  };
  return (
    <div className={`flex absolute ${getClassByPosition()} -right-[60px] items-center justify-between`}>
      <Text className='mb-0 text-axone-khaki'>{value}K</Text>
      <div className='w-[140px] border-t border-dashed border-axone-khaki my-4 mx-2'></div>
      <Text className='mb-0 text-axone-khaki'>{value}K</Text>
    </div>
  );
};

const OneBarChart: FC<OneBarChartProps> = ({ width = 100, height = 200, data }) => {
  const percentage: number = ((data.current - data.min) / (data.max - data.min)) * 100;
  const barHeight: number = (height * percentage) / 100;

  return (
    <BoxInner style={{ width, height }} className={'relative rounded-lg flex-col justify-end'}>
      <ChartLine position='top' value={data.max} />
      <ChartLine position='middle' value={(data.min + data.max)/2} />
      <ChartLine position='bottom' value={data.min} />
      <div style={{ height: barHeight }} className={'bg-gradient-to-b from-axone-blue to-transparent w-auto m-2 rounded-lg'}></div>
    </BoxInner>
  );
};

export { OneBarChart };
export type { MockDataType };
