
import { FC } from 'react';
import { Text } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { formatNumber } from '@/lib/utils';

type MockDataType = {
  min: number;
  current: number;
  max: number;
  postFix?: string
};

type OneBarChartProps = {
  width?: number;
  height?: number;
  data: MockDataType;
};

type ChartLineProps = {
  value?: string;
  position?: 'top' | 'middle' | 'bottom';
  postFix?: string;
};

const ChartLine: FC<ChartLineProps> = ({ value = '0', position = 'top', postFix = '', customRight = '' }) => {
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
    <div
      className={`flex absolute ${getClassByPosition()} items-center justify-between`}
      style={{ right: `${customRight ? customRight : value.length <= 4 ? '-60%' : '-90%'}` }}
    >
      <Text className='mb-0 text-axone-khaki'>{value}{postFix}</Text>
      <div className='w-[140px] border-t border-dashed border-axone-khaki my-4 mx-2'></div>
      <Text className='mb-0 text-axone-khaki'>{value}{postFix}</Text>
    </div>
  );
};

const OneBarChart: FC<OneBarChartProps> = ({ width = 100, height = 200, data }) => {
  const percentage: number = ((data.current - data.min) / (data.max - data.min)) * 100;
  const barHeight: number = (height * percentage) / 100;
  console.log('asd', percentage, height, data.min + data.max, (data.min + data.max)/2, formatNumber((data.min + data.max)/2), data.current);

  return (
    <BoxInner style={{ width, height }} className={'relative rounded-lg flex-col justify-end'}>
      <ChartLine
        position='top'
        value={data.postFix ? data.max : formatNumber(data.max)} postFix={data.postFix || ''}
        customRight={data.postFix ? '-60%' : ''}
      />
      <ChartLine
        position='middle'
        value={data.postFix ? (data.min + data.max)/2 : formatNumber((data.min + data.max)/2)} postFix={data.postFix || ''}
        customRight={data.postFix ? '-50%' : ''}
      />
      <ChartLine
        position='bottom'
        value={data.postFix ? data.min : formatNumber(data.min)} postFix={data.postFix || ''}
        customRight={data.postFix ? '-45%' : ''}
      />
      <div style={{ height: barHeight }} className={'bg-gradient-to-b from-axone-blue to-transparent w-auto m-2 rounded-lg'}></div>
    </BoxInner>
  );
};

export { OneBarChart };
export type { MockDataType };
