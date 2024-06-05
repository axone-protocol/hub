import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { ChartData } from '@/app/mock-chart-data';
import { useEnvironment } from '@/context/environment-context';

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

const getOverviewChartDataFn = async (range: OverviewChartFilterRangeEnum = OverviewChartFilterRangeEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<ChartData[]>(baseUrl + '/token/historical', { params: { range } });

  return data.reverse();
};

export const useDashboardChartQueryKey = ['overview-chart'];

export const useOverviewChart = () => {
  const [range, selectRange] = useState<OverviewChartFilterRangeEnum>(OverviewChartFilterRangeEnum.DAY);
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    refetchOnMount: true,
    queryKey: [...useDashboardChartQueryKey, range],
    queryFn: () => getOverviewChartDataFn(range, baseUrl),
    initialData: [] as ChartData[],
  });

  return { query, range, selectRange };
};