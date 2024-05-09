'use client';

import Image from 'next/image';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { MockDataType, OneBarChart } from '@/components/ui/charts/one-bar-chart';
import Row from '@/components/ui/row';
import TimeframeSelect from '@/components/ui/select-timeframe';

const issuanceMock: MockDataType = {
  min: 600,
  current: 920,
  max: 1000,
};

const burnMock: MockDataType = {
  min: 800,
  current: 1030,
  max: 1200,
};

const growMock: MockDataType = {
  min: -20,
  current: -5,
  max: 20,
};

const ThreeBarsBlock = (): JSX.Element => {
  return(
    <Box className='w-full m-0 h-[50%] mobile:w-full'>
      <Row className=''>
        <TimeframeSelect />
      </Row>

      <Row className='lg:hidden justify-around w-full mt-6 gap-4'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>Currency</Text>
        <Text className='text-axone-orange tracking-tighter uppercase mb-0 cursor-pointer'>Axone</Text>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>USD</Text>
      </Row>

      {/* Charts are here */}
      <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-around lg:items-start'>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>Issuance</Text>
          <OneBarChart data={issuanceMock} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>{issuanceMock.current}K</span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>AXONE/YEAR</Text>
          <Image className='mt-3' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>Supply Burn</Text>
          <OneBarChart data={burnMock} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>{burnMock.current}K</span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>AXONE/YEAR</Text>
          <Image className='mt-3' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>Supply Growth</Text>
          <OneBarChart data={growMock} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>{growMock.current}%</span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>AXONE/YEAR</Text>
        </div>

      </div>

      <Row className='hidden lg:flex justify-end w-full mt-6 gap-4'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>Currency</Text>
        <Text className='text-axone-orange tracking-tighter uppercase mb-0 cursor-pointer'>Axone</Text>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>USD</Text>
      </Row>
    </Box>
  );
};

export { ThreeBarsBlock };