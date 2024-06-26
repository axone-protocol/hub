import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useEnvironment } from '@/context/environment-context';
import { ChangeSupplyRangeEnum } from './use-supply-change';

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

const getSupplyBarChartsDataFn = async (range: ChangeSupplyRangeEnum = ChangeSupplyRangeEnum.DAY, baseUrl: string | undefined) => {
  const { data } = await axios.get<SupplyBarChartsData>(baseUrl + '/supply/charts', { params: { range } });

  return data;
};

export const useSupplyBarChartsQueryKey = ['supply-bar-charts'];

export const useSupplyBarCharts = () => {
  const [range, selectRange] = useState<ChangeSupplyRangeEnum>(ChangeSupplyRangeEnum.DAY);

  const { baseUrl } = useEnvironment();

  const query = useQuery({
    enabled: true,
    queryKey: [...useSupplyBarChartsQueryKey, range],
    queryFn: () => getSupplyBarChartsDataFn(range, baseUrl),
    staleTime: 1000 * 60 * 2,
  });

  return { query, range, selectRange };
};