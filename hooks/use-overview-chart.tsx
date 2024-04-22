import { useQuery } from '@tanstack/react-query';
import { ChartData } from '@/app/mock-chart-data';
import { api } from '@/core/api';

/**
 * Getting data for the overview chart on the dashboard
 */

const getOverviewChartDataFn = async () => {
  const { data } = await api.get<ChartData[]>('/api/historical-price?symbol=eth&range=43800');

  return data;
};

export const useDashboardChartQueryKey = ['overview-chart'];

export const useOverviewChart = () => {
  const query = useQuery({
    queryKey: useDashboardChartQueryKey,
    queryFn: getOverviewChartDataFn,
    initialData: [] as ChartData[],
  });

  return query;
};