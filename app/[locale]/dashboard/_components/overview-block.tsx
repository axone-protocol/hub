'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import AxoneAreaChart from '@/components/ui/charts/axone-area-chart';
import Row from '@/components/ui/row';
import { useTimeFrameStore } from '@/hooks/timeframe/use-timeframe-store';
import { useAxoneToasts } from '@/hooks/use-axone-toasts';
import { useOverviewChart } from '@/hooks/use-overview-chart';
import { useTokenInfo } from '@/hooks/use-token-info';
import { FilterByRange } from './filter-by-range';
import { OverviewMetrics } from './overview-metrics';
import { MetricsLoadingSkeleton } from './overview-metrics-loading-skeleton';

export default function OverviewBlock () {
  const t = useTranslations('Dashboard');
  const { query } = useOverviewChart();
  const { timeFrame, setTimeFrame } = useTimeFrameStore();
  const { isLoading, isLoadingError, isFetching, isError } = useTokenInfo();
  const { showErrorToast } = useAxoneToasts();

  useEffect(() => {
    if (isLoadingError || isError) {
      showErrorToast('Something went wrong. Please try again later.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingError, isError]);

  return (
    <Box className='w-full lg:w-2/3 m-0 h-[50%]'>
      <Row className='mb-10 items-left lg:items-center mobile:flex-col'>
        <Title className='mr-40'>{t('Chart.Overview')}</Title>
        <div className='w-full overflow-x-auto'>
          <FilterByRange range={timeFrame} selectRange={setTimeFrame} />
        </div>
      </Row>

      <BoxInner className='h-[384px] py-5'>
        <AxoneAreaChart data={query.data} />
      </BoxInner>

      <div className='gap-4 columns-2 lg:columns-4 lg:flex-row lg:w-full mt-10 desktop:mt-8'>
        {
          isLoading || isFetching || isError || isLoadingError
            ? <MetricsLoadingSkeleton />
            : <OverviewMetrics />
        }
      </div>
    </Box>
  );
}