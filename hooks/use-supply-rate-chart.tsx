import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useEnvironment } from '@/context/environment-context';

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

const getSupplyRateChartDataFn = async (range: SupplyRateChartFilterRangeEnum = SupplyRateChartFilterRangeEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyChartData[]>(baseUrl + '/supply/historical', { params: { range } });

  return data.reverse();
};

export const useSupplyRateChartQueryKey = ['supply-rate-chart'];

export const useSupplyRateChart = () => {
  const [range, selectRange] = useState<SupplyRateChartFilterRangeEnum>(SupplyRateChartFilterRangeEnum.DAY);
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyRateChartQueryKey, range],
    queryFn: () => getSupplyRateChartDataFn(range, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query, range, selectRange };
};