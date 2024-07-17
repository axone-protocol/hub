'use client';
import { formatDistanceToNow } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import SupplyRateChart from '@/components/ui/charts/supply-rate-chart';
import Row from '@/components/ui/row';
import { TimeFrameSelect } from '@/components/ui/selects';
import Spinner from '@/components/ui/spinner';
import { useSupplyChange } from '@/hooks/use-supply-change';
import { useSupplyRateChart } from '@/hooks/use-supply-rate-chart';
import { getLocaleForTime } from '@/lib/utils';

const SupplyRateBlock = () => {
  const { data, isError, isLoadingError, isLoading, isFetching } = useSupplyRateChart();
  const { query: { data: supplyChange } } = useSupplyChange();
  const lang = useLocale();
  const locale = getLocaleForTime(lang);

  const updatedDate = useMemo(() => new Date(supplyChange?.time ? supplyChange?.time : Date.now()), [supplyChange?.time]);
  const timeAgo = useMemo(() => formatDistanceToNow(updatedDate, { addSuffix: true, locale: locale }), [locale, updatedDate]);
  const t = useTranslations('Dashboard');

  return (
    <Box className='w-full lg:w-2/3 m-0 h-[50%]'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>{t('SupplyRate')}</Text>
        <TimeFrameSelect />
      </Row>

      <BoxInner className='h-[384px] py-5'>
        {
          isLoading || isFetching || isError || isLoadingError
            ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div>
            : <SupplyRateChart data={data || []} />
        }
      </BoxInner>

      <Row className='justify-between w-full mt-6'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0'>{t('Updated') + ' ' + timeAgo}</Text>
        <div className='flex'>
          <div className='w-4 h-4 rounded-full bg-axone-orange'></div>
          <Text className='text-axone-grey tracking-tighter uppercase mb-0 ml-2'>AXONE</Text>
        </div>
      </Row>
    </Box>
  );
};

export default memo<typeof SupplyRateBlock>(SupplyRateBlock);