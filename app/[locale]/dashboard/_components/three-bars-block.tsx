'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { MockDataType, OneBarChart } from '@/components/ui/charts/one-bar-chart';
import Row from '@/components/ui/row';
import { TimeFrameSelect } from '@/components/ui/selects';
import { useSupplyBarCharts } from '@/hooks/use-supply-bar-charts';
import { useTokenInfo } from '@/hooks/use-token-info';
import { cn, formatNumber } from '@/lib/utils';

const returnGrowthChartData = (current: string | number): MockDataType => {
  return ({
    min: 0,
    current: Number(current),
    max: 100,
    postFix: '%',
  });
};

enum CurrencyEnum {
  AXONE = 'AXONE',
  USD = 'USD',
}

const ThreeBarsBlock = (): JSX.Element => {
  const t = useTranslations('Dashboard');
  const { query: { data } } = useSupplyBarCharts();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(CurrencyEnum.AXONE);
  const { data: tokenInfo } = useTokenInfo();

  const changeCurrency = (currency: CurrencyEnum) => () => {
    setSelectedCurrency(currency);
  };

  const issuanceInAxone = formatNumber(Number(data?.issuance) || 0);
  const burntInAxone = formatNumber(Number(data?.burnt) || 0);
  const issuanceInUSD = formatNumber(Number(data?.issuance) * Number(tokenInfo?.price.value) || 0);
  const burntInUSD = formatNumber(Number(data?.burnt) * Number(tokenInfo?.price.value) || 0);
  const burntData = {
    min: Number(data?.burnt) * 0.7 || 0,
    current: Number(data?.burnt) || 0,
    max: Number(data?.burnt) * 1.1 || 0,
  };

  const issuanceData = {
    min: Number(data?.issuance) * 0.7 || 0,
    current: Number(data?.issuance) || 0,
    max: Number(data?.issuance) * 1.1 || 0,
  };

  console.log(issuanceData, data?.issuance, issuanceInAxone);
  return(
    <Box className='w-full m-0 h-[50%] mobile:w-full'>
      <Row>
        <TimeFrameSelect />
      </Row>

      <Row className='lg:hidden justify-around w-full mt-6 gap-4'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>{t('Currency')}</Text>
        <Text className='text-axone-orange tracking-tighter uppercase mb-0 cursor-pointer'>Axone</Text>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>USD</Text>
      </Row>

      {/* Charts are here */}
      <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-around lg:items-start'>

        <div className='lg:w-[180px] my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>
            {t('Issuance')}
          </Text>
          <OneBarChart data={issuanceData} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>
            {selectedCurrency === CurrencyEnum.AXONE ? issuanceInAxone : issuanceInUSD}
          </span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>{selectedCurrency}/{t('Year')}</Text>
          <Image className='mt-3' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='lg:w-[180px] my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>
            {t('SupplyBurn')}
          </Text>
          <OneBarChart data={burntData} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>
            {selectedCurrency === CurrencyEnum.AXONE ? burntInAxone : burntInUSD}
          </span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>{selectedCurrency}/{t('Year')}</Text>
          <Image className='mt-3' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='lg:w-[180px] my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>
            {t('SupplyGrowth')}
          </Text>
          <OneBarChart data={returnGrowthChartData(data?.growth || 0)} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>
            {data?.growth || 0}%
          </span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>{selectedCurrency}/{t('Year')}</Text>
        </div>

      </div>

      <Row className='hidden lg:flex justify-end w-full mt-6 gap-4'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>{t('Currency')}</Text>
        <Text
          onClick={changeCurrency(CurrencyEnum.AXONE)}
          className={cn('text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer', { 'text-axone-orange': selectedCurrency === CurrencyEnum.AXONE })}
        >
          Axone
        </Text>
        <Text
          onClick={changeCurrency(CurrencyEnum.USD)}
          className={cn('text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer', { 'text-axone-orange': selectedCurrency === CurrencyEnum.USD })}
        >
          USD
        </Text>
      </Row>
    </Box>
  );
};

export { ThreeBarsBlock };