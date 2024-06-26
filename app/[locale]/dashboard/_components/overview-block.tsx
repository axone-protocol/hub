'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import AxoneAreaChart from '@/components/ui/charts/axone-area-chart';
import Row from '@/components/ui/row';
import { useCurrencyStore } from '@/hooks/use-currencies';
import { useOverviewChart } from '@/hooks/use-overview-chart';
import { useTokenInfo } from '@/hooks/use-token-info';
import { cn, formatNumber } from '@/lib/utils';
import { FilterByRange } from './filter-by-range';

export default function OverviewBlock () {
  const t  = useTranslations('Dashboard');
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  const currencySign = useCurrencyStore((state) => state.currencySign);
  const { query, range, selectRange } = useOverviewChart();
  const { data: tokenInfo } = useTokenInfo();

  const tokenPrice = tokenInfo?.price ? tokenInfo?.price?.value : 0;
  const tokenChange = tokenInfo?.price ? tokenInfo?.price?.change : 0;
  const marketCap = tokenInfo?.marketCap ? tokenInfo?.marketCap?.value : 0;
  const marketCapChange = tokenInfo?.marketCap ? tokenInfo?.marketCap?.change : 0;
  const volume = tokenInfo?.volume || 0;
  return (
    <Box className='w-2/3 m-0 mr-6 h-[50%] mobile:w-full'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>{t('Chart.Overview')}</Title>
        <div className='w-full overflow-x-auto'><FilterByRange range={range} selectRange={selectRange} /></div>
      </Row>

      <BoxInner className='h-[384px] py-5'>
        <AxoneAreaChart data={query.data} />
      </BoxInner>

      <div className='gap-4 columns-2 lg:columns-4 lg:flex-row lg:w-full mt-10 desktop:mt-8'>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>
            {currencySign}{(tokenPrice * exchangeRate).toFixed(2)}
          </Title>
          <Text className={cn('uppercase', { 'text-axone-red': tokenChange < 0, 'text-axone-green': tokenChange > 0 })}>
            {tokenChange.toFixed(2) || 0}%
          </Text>
          <Text className='uppercase text-axone-khaki'>
            {t('Price')}
          </Text>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>
            {currencySign}{formatNumber(marketCap * exchangeRate)}
          </Title>
          <Text className={cn('uppercase', { 'text-axone-red': marketCapChange < 0, 'text-axone-green': marketCapChange > 0 })}>
            {marketCapChange.toFixed(3) ||  0}%
          </Text>
          <Text className='uppercase text-axone-khaki text-center'>
            {t('MarketCap')}
          </Text>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>
            {currencySign}{formatNumber(volume * exchangeRate)}
          </Title>
          <Row className='justify-center items-center'>
            <Text className='uppercase text-axone-khaki mr-3'>
              {t('Volume')}
            </Text>
            <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
          </Row>
        </BoxInner>

        <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>
            {Number(tokenInfo?.apr || 0).toFixed(2)}%
          </Title>
          <Text className='uppercase text-axone-khaki'>
            { t('APR')}
          </Text>
        </BoxInner>
      </div>
    </Box>
  );
}