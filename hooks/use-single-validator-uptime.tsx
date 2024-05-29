import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

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

const getSingleValidatorUptimeDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorUptimeData>(`${baseUrl}/staking/validators/${address}/uptime`);

  const formattedData = {
    ...data,
    current: Number(data.current)
  };

  return formattedData;
};

export const useSingleValidatorUptimeQueryKey = ['single-validator-uptime'];

export const useSingleValidatorUptime = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorUptimeQueryKey, address],
    queryFn: () => getSingleValidatorUptimeDataFn(address, baseUrl),
    refetchInterval: 10000 // 10 seconds
  });

  return query;
};