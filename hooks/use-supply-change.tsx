import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useEnvironment } from '@/context/environment-context';

export enum ChangeSupplyRangeEnum {
  FIVE_MIN = 'fiveMin',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

type SupplyChangeData = {
  time: string;
  change: number;
  burnt: number;
  issuance: number;
}

const getSupplyChangeDataFn = async (range: ChangeSupplyRangeEnum = ChangeSupplyRangeEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyChangeData>(baseUrl + '/supply/change', { params: { range } });

  return data;
};

export const useSupplyChangeQueryKey = ['supply-change'];

export const useSupplyChange = () => {
  const [range, selectRange] = useState<ChangeSupplyRangeEnum>(ChangeSupplyRangeEnum.DAY);
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyChangeQueryKey, range],
    queryFn: () => getSupplyChangeDataFn(range, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query, range, selectRange };
};