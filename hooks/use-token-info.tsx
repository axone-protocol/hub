import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

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
  apr: number | string;
}

const getTokenInfoFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<TokenInfoData>(baseUrl + '/token');

  return data;
};

export const useTokenInfoQueryKey = ['token-info'];

export const useTokenInfo = () => {
  const { baseUrl } = useEnvironment();

  const query = useQuery({
    refetchOnMount: true,
    queryKey: useTokenInfoQueryKey,
    queryFn: () => getTokenInfoFn(baseUrl),
  });

  return query;
};