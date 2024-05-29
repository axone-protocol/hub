import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

type SingleValidatorData = {
  address: string;
  commission: {
    updateTime: string,
    rate: string,
    maxChangeRate: string,
    maxRate: string
  };
  description: {
    moniker: string,
    details: string,
    securityContact: string,
    identity: string,
    website: string
  };
  jailed: boolean;
  logo: string;
  stakedAmount: string;
  status: string;
  uptime: number;
  votingPower: number;
}

const getSingleValidatorDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<SingleValidatorData>(`${baseUrl}/staking/validators/${address}`);

  return data;
};

export const useSingleValidatorQueryKey = ['single-validator-details'];

export const useSingleValidatorInfo = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorQueryKey, address],
    queryFn: () => getSingleValidatorDataFn(address, baseUrl),
  });

  return query;
};