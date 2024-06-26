'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { MockDataType, OneBarChart } from '@/components/ui/charts/one-bar-chart';
import Row from '@/components/ui/row';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupplyBarCharts } from '@/hooks/use-supply-bar-charts';
import { ChangeSupplyRangeEnum } from '@/hooks/use-supply-change';
import { useTokenInfo } from '@/hooks/use-token-info';
import { cn, formatNumber } from '@/lib/utils';

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

const returnGrowthChartData = (current: string | number): MockDataType => {
  return ({
    min: 0,
    current: Number(current),
    max: 100,
    postFix: '%',
  });
};

type TimeFrameSelectProps = {
  selectRange: (value: ChangeSupplyRangeEnum) => void;
  range: ChangeSupplyRangeEnum;
};

const TimeFrameSelect: FC<TimeFrameSelectProps> = ({ selectRange, range }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = (): void => {
    setOpen(prev => !prev);
  };

  const onValueChange = (value: ChangeSupplyRangeEnum): void => {
    selectRange(value);
  };

  return (
    <Select value={range} onOpenChange={onOpenChange} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-50 relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <SelectValue className='mb-2' placeholder='5 Min' />
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value={ChangeSupplyRangeEnum.FIVE_MIN}>5 min</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.HOUR}>Hour</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.DAY}>Day</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.WEEK}>Week</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.MONTH}>Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

enum CurrencyEnum {
  AXONE = 'AXONE',
  USD = 'USD',
}

const ThreeBarsBlock = (): JSX.Element => {
  const t = useTranslations('Dashboard');
  const { query: { data }, range, selectRange } = useSupplyBarCharts();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(CurrencyEnum.AXONE);
  const { data: tokenInfo } = useTokenInfo();

  const changeCurrency = (currency: CurrencyEnum) => () => {
    setSelectedCurrency(currency);
  };

  const issuanceInAxone = formatNumber(Number(data?.issuance.issuance)/1000000 || 0);
  const burntInAxone = formatNumber(Number(data?.issuance.burnt)/1000000 || 0);
  const issuanceInUSD = formatNumber(Number(data?.issuance.issuance) * Number(tokenInfo?.price.value) || 0);
  const burntInUSD = formatNumber(Number(data?.issuance.burnt) * Number(tokenInfo?.price.value) || 0);

  return(
    <Box className='w-full m-0 h-[50%] mobile:w-full'>
      <Row className=''>
        <TimeFrameSelect selectRange={selectRange} range={range} />
      </Row>

      <Row className='lg:hidden justify-around w-full mt-6 gap-4'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>{t('Currency')}</Text>
        <Text className='text-axone-orange tracking-tighter uppercase mb-0 cursor-pointer'>Axone</Text>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0 cursor-pointer'>USD</Text>
      </Row>

      {/* Charts are here */}
      <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-around lg:items-start'>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>
            {t('Issuance')}
          </Text>
          <OneBarChart data={issuanceMock} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>
            {selectedCurrency === CurrencyEnum.AXONE ? issuanceInAxone : issuanceInUSD}
          </span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>{selectedCurrency}/{t('Year')}</Text>
          <Image className='mt-3' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-6'>
            {t('SupplyBurn')}
          </Text>
          <OneBarChart data={burnMock} />
          <span className='text-white text-40 tracking-tighter uppercase mt-6'>
            {selectedCurrency === CurrencyEnum.AXONE ? burntInAxone : burntInUSD}
          </span>
          <Text className='text-axone-grey tracking-tighter uppercase mt-4'>{selectedCurrency}/{t('Year')}</Text>
          <Image className='mt-3' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
        </div>

        <div className='my-6 lg:my-0 flex flex-col items-center'>
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