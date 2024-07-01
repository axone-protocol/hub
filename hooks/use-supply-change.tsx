import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { SupplyChangeDTO } from './dto/supply-change.dto';
import { TimeFrameEnum, useTimeFrameStore } from './timeframe/use-timeframe-store';

const getSupplyChangeDataFn = async (range: TimeFrameEnum = TimeFrameEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyChangeDTO>(baseUrl + '/supply/change', { params: { range } });

  return data;
};

export const useSupplyChangeQueryKey = ['supply-change'];

export const useSupplyChange = () => {
  const { timeFrame } = useTimeFrameStore();
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyChangeQueryKey, timeFrame],
    queryFn: () => getSupplyChangeDataFn(timeFrame, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query };
};