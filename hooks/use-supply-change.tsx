import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/core/api';

export enum ChangeSupplyRangeEnum {
  FIVE_MIN = 'fiveMin',
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

/**
 * Getting data for the supply change
 */

const getSupplyChangeDataFn = async (range: ChangeSupplyRangeEnum = ChangeSupplyRangeEnum.DAY) => {
  const { data } = await api.get<string>(`/supply/change?range=${range}`);

  return data;
};

export const useSupplyChangeQueryKey = ['supply-change'];

export const useSupplyChange = () => {
  const [range, selectRange] = useState<ChangeSupplyRangeEnum>(ChangeSupplyRangeEnum.DAY);

  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyChangeQueryKey, range],
    queryFn: () => getSupplyChangeDataFn(range),
    staleTime: 1000 * 60 * 2,
  });

  return { query, range, selectRange };
};