import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { SupplyRateChartDTO } from './dto/supply-rate.dto';
import { TimeFrameEnum, useTimeFrameStore } from './timeframe/use-timeframe-store';

const getSupplyRateChartDataFn = async (range: TimeFrameEnum = TimeFrameEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyRateChartDTO[]>(baseUrl + '/supply/historical', { params: { range } });

  return data.reverse();
};

export const useSupplyRateChartQueryKey = ['supply-rate-chart'];

export const useSupplyRateChart = () => {
  const { timeFrame } = useTimeFrameStore();
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyRateChartQueryKey, timeFrame],
    queryFn: () => getSupplyRateChartDataFn(timeFrame, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query };
};