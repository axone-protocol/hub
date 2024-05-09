import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/core/api';

/**
 * Getting data for the supply range chart on the dashboard
 */

export enum SupplyRateChartFilterRangeEnum {
  ALL = 'all',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export type SupplyChartData = {
  time: string;
  change: number;
}

const getSupplyRateChartDataFn = async (range: SupplyRateChartFilterRangeEnum = SupplyRateChartFilterRangeEnum.DAY) => {
  const { data } = await api.get<SupplyChartData[]>('/supply/historical', { params: { range } });

  return data;
};

export const useSupplyRateChartQueryKey = ['supply-rate-chart'];

export const useSupplyRateChart = () => {
  const [range, selectRange] = useState<SupplyRateChartFilterRangeEnum>(SupplyRateChartFilterRangeEnum.DAY);

  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyRateChartQueryKey, range],
    queryFn: () => getSupplyRateChartDataFn(range),
    staleTime: 1000 * 60 * 2,
  });

  return { query, range, selectRange };
};