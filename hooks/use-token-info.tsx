import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { TokenInfoDTO } from './dto/token-info.dto';

const getTokenInfoFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<TokenInfoDTO>(baseUrl + '/token');

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