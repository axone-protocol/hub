import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

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

const getSingleValidatorDataFn = async (address: string | string[]) => {
  const { data } = await api.get<SingleValidatorData>(`/staking/validators/${address}`);

  return data;
};

export const useSingleValidatorQueryKey = ['single-validator-details'];

export const useSingleValidatorInfo = (address: string | string[]) => {

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorQueryKey, address],
    queryFn: () => getSingleValidatorDataFn(address),
  });

  return query;
};