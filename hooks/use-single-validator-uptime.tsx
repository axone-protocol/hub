import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { ValidatorUptimeDTO } from './dto/validator-uptime.dto';

const getSingleValidatorUptimeDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorUptimeDTO>(`${baseUrl}/staking/validators/${address}/uptime`);

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