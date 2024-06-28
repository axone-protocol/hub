import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { TimeFrameEnum, useTimeFrameStore } from './timeframe/use-timeframe-store';

type SupplyBarChartsData = {
  issuance: {
    time: string;
    change: number;
    burnt: number;
    issuance: number;
  };
  burnt: number;
  growth: number;
}

const getSupplyBarChartsDataFn = async (range: TimeFrameEnum = TimeFrameEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyBarChartsData>(baseUrl + '/supply/charts', { params: { range } });

  return data;
};

export const useSupplyBarChartsQueryKey = ['supply-bar-charts'];

export const useSupplyBarCharts = () => {
  const { timeFrame } = useTimeFrameStore();

  const { baseUrl } = useEnvironment();

  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyBarChartsQueryKey, timeFrame],
    queryFn: () => getSupplyBarChartsDataFn(timeFrame, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query };
};