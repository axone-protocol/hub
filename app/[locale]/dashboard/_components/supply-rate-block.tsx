'use client';
import { memo } from 'react';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import SupplyRateChart from '@/components/ui/charts/supply-rate-chart';
import Row from '@/components/ui/row';
import TimeframeSelect from '@/components/ui/select-timeframe';
import { useOverviewChart } from '@/hooks/use-overview-chart';

const SupplyRateBlock = () => {
  const { data: chartData } = useOverviewChart();

  return (
    <Box className='w-full m-0 h-[50%] mobile:w-full'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>Supply Rate</Text>
        <TimeframeSelect />
      </Row>

      {/* Chart is here */}
      <BoxInner className='h-[384px] py-5'>
        <SupplyRateChart data={chartData} />
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