'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import AxoneAreaChart from '@/components/ui/charts/axone-area-chart';
import Row from '@/components/ui/row';
import { useOverviewChart } from '@/hooks/use-overview-chart';
import { useTokenInfo } from '@/hooks/use-token-info';
import { FilterByRange } from './filter-by-range';

function formatNumber (num: number | undefined): string {
  if (num === undefined) {
    return '0';
  }
  let value = num;
  let suffix = '';

  if (num >= 1e6) {
    value = num / 1e6;
    suffix = 'M';
  } else if (num >= 1e3) {
    value = num / 1e3;
    suffix = 'K';
  }

  const integerPart: number = Math.floor(value);
  const decimalPart: string = (value - integerPart).toFixed(2).slice(2);
  return `${integerPart.toLocaleString('de-DE')}.${decimalPart}${suffix}`;
}

export default function OverviewBlock () {
  const t  = useTranslations('Dashboard');
  const { query, range, selectRange } = useOverviewChart();
  const { data: tokenInfo } = useTokenInfo();

  return (
    <Box className='w-2/3 m-0 mr-6 h-[50%] mobile:w-full'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>{t('Chart.Overview')}</Title>
        <FilterByRange range={range} selectRange={selectRange} />
      </Row>

      <BoxInner className='h-[384px] py-5'>
        <AxoneAreaChart data={query.data} />
      </BoxInner>

      <div className='gap-4 columns-2 lg:columns-4 lg:flex-row lg:w-full mt-10 desktop:mt-8'>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>${tokenInfo?.price.value.toFixed(2)}</Title>
          <Text className='uppercase text-axone-red'>
            {tokenInfo?.price.change.toFixed(2)}%
          </Text>
          <Text className='uppercase text-axone-khaki'>
            {t('Price')}
          </Text>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>${formatNumber(tokenInfo?.marketCap.value)}</Title>
          <Text className='uppercase text-axone-red'>
            {tokenInfo?.marketCap.change}%
          </Text>
          <Text className='uppercase text-axone-khaki text-center'>
            {t('MarketCap')}
          </Text>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>${formatNumber(tokenInfo?.volume)}</Title>
          <Row className='justify-center items-center'>
            <Text className='uppercase text-axone-khaki mr-3'>
              {t('Volume')}
            </Text>
            <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
          </Row>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>15.71%</Title>
          <Text className='uppercase text-axone-khaki'>
            { t('APR')}
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
}