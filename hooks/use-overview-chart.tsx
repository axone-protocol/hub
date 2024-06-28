import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChartData } from '@/app/mock-chart-data';
import { useEnvironment } from '@/context/environment-context';
import { TimeFrameEnum, useTimeFrameStore } from './timeframe/use-timeframe-store';

const getOverviewChartDataFn = async (range: TimeFrameEnum = TimeFrameEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<ChartData[]>(baseUrl + '/token/historical', { params: { range } });

  return data.reverse();
};

export const useDashboardChartQueryKey = ['overview-chart'];

export const useOverviewChart = () => {
  const { timeFrame } = useTimeFrameStore();
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    refetchOnMount: true,
    queryKey: [...useDashboardChartQueryKey, timeFrame],
    queryFn: () => getOverviewChartDataFn(timeFrame, baseUrl),
    initialData: [] as ChartData[],
  });

  return { query };
};