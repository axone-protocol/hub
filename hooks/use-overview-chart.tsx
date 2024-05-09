import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChartData } from '@/app/mock-chart-data';
import { api } from '@/core/api';

/**
 * Getting data for the overview chart on the dashboard
 */

export enum OverviewChartFilterRangeEnum {
  ALL = 'all',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  THREE_MONTH = 'threeMonth',
  YEAR = 'year',
}

const getOverviewChartDataFn = async (range: OverviewChartFilterRangeEnum = OverviewChartFilterRangeEnum.DAY) => {
  const { data } = await api.get<ChartData[]>('/price/historical', { params: { range } });

  return data;
};

export const useDashboardChartQueryKey = ['overview-chart'];

export const useOverviewChart = () => {
  const [range, selectRange] = useState<OverviewChartFilterRangeEnum>(OverviewChartFilterRangeEnum.DAY);

  const query = useQuery({
    refetchOnMount: true,
    queryKey: [...useDashboardChartQueryKey, range],
    queryFn: () => getOverviewChartDataFn(range),
    initialData: [] as ChartData[],
  });

  return { query, range, selectRange };
};