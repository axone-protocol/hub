import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

/**
 * Getting data for the current supply
 */

type TokenInfoData = {
  price: {
    value: number;
    change: number;
  },
  marketCap: {
    value: number;
    change: number;
  },
  volume: number;
}

const getTokenInfoFn = async () => {
  const { data } = await api.get<TokenInfoData>('/token');

  return data;
};

export const useTokenInfoQueryKey = ['token-info'];

export const useTokenInfo = () => {
  const query = useQuery({
    refetchOnMount: true,
    queryKey: useTokenInfoQueryKey,
    queryFn: getTokenInfoFn,
  });

  return query;
};