import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

type SingeBlockData = {
  blockIdFlag: number,
  address: string,
  timestamp: string,
  signature: string
}

type ValidatorUptimeData = {
  blocks: SingeBlockData[],
  current: string
}

const getSingleValidatorUptimeDataFn = async (address: string | string[]) => {
  const { data } = await api.get<ValidatorUptimeData>(`/staking/validators/${address}/uptime`);

  const formattedData = {
    ...data,
    current: Number(data.current)
  };

  return formattedData;
};

export const useSingleValidatorUptimeQueryKey = ['single-validator-uptime'];

export const useSingleValidatorUptime = (address: string | string[]) => {

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorUptimeQueryKey, address],
    queryFn: () => getSingleValidatorUptimeDataFn(address),
    refetchInterval: 10000 // 10 seconds
  });

  return query;
};