'use client';
import Image from 'next/image';
import { FC, memo } from 'react';
import { useState } from 'react';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import SupplyRateChart from '@/components/ui/charts/supply-rate-chart';
import Row from '@/components/ui/row';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SupplyRateChartFilterRangeEnum, useSupplyRateChart } from '@/hooks/use-supply-rate-chart';

import { cn } from '@/lib/utils';

type TimeFrameSelectProps = {
  selectRange: (value: SupplyRateChartFilterRangeEnum) => void;
};

const TimeFrameSelect: FC<TimeFrameSelectProps> = ({ selectRange }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = () => {
    setOpen(prev => !prev);
  };

  const onValueChange = (value: SupplyRateChartFilterRangeEnum) => {
    selectRange(value);
  };

  return (
    <Select defaultValue={SupplyRateChartFilterRangeEnum.DAY} onOpenChange={onOpenChange} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-50 relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <Text className='uppercase mb-0 mr-2'>Time Frame</Text> <SelectValue className='mb-2' placeholder='5 Min' />
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value={SupplyRateChartFilterRangeEnum.ALL}>All</SelectItem>
          <SelectItem value={SupplyRateChartFilterRangeEnum.DAY}>1 Day</SelectItem>
          <SelectItem value={SupplyRateChartFilterRangeEnum.WEEK}>1 Week</SelectItem>
          <SelectItem value={SupplyRateChartFilterRangeEnum.MONTH}>1 Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

const SupplyRateBlock = () => {
  const { query, selectRange } = useSupplyRateChart();

  return (
    <Box className='w-full m-0 h-[50%] mobile:w-full'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>Supply Rate</Text>
        <TimeFrameSelect selectRange={selectRange} />
      </Row>

      {/* Chart is here */}
      <BoxInner className='h-[384px] py-5'>
        <SupplyRateChart data={query.data} />
      </BoxInner>

      <Row className='justify-between w-full mt-6'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0'>Updated 34 seconds ago</Text>
        <div className='flex'>
          <div className='w-4 h-4 rounded-full bg-axone-orange'></div>
          <Text className='text-axone-grey tracking-tighter uppercase mb-0 ml-2'>AXONE</Text>
        </div>
      </Row>
    </Box>
  );
};

export default memo<typeof SupplyRateBlock>(SupplyRateBlock);