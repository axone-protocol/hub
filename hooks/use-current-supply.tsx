import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

/**
 * Getting data for the current supply
 */

type CurrentSupplyData = {
  time: string;
  supply: string;
  change: number;
}

const getCurrentSupplyFn = async () => {
  const { data } = await api.get<CurrentSupplyData>('/supply');

  const formattedData = {
    ...data,
    supply: parseFloat(data.supply) / 1000000,
  };

  return formattedData;
};

export const useCurrentSupplyQueryKey = ['current-supply'];

export const useCurrentSupply = () => {
  const query = useQuery({
    refetchOnMount: true,
    queryKey: useCurrentSupplyQueryKey,
    queryFn: getCurrentSupplyFn,
  });

  return query;
};