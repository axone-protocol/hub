import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

export type SingleBlockData = {
  address: string,
  timestamp: string,
  signature: string
  status: 'Signed' | 'Proposed' | 'Missed'
}

export type ValidatorUptimeData = {
  blocks: SingleBlockData[],
  current: string | number
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
  });

  return query;
};