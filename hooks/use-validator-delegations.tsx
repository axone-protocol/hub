import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

export type ValidatorDelegation = {
  delegator: string;
  delegatedAmount: string;
  commission: string;
}

type ValidatorDelegationsData = {
  validatorDelegations: ValidatorDelegation[];
  pagination: {
    total: number;
    limit: number | string | null;
    offset: number | string | null;
  }
}

const getValidatorDelegationsDataFn = async (address: string | string[]) => {
  const { data } = await api.get<ValidatorDelegationsData>('/staking/validator-delegations', { params: { address } });

  return data;
};

export const useValidatorDelegationsQueryKey = ['validator-delegations-list'];

export const useValidatorDelegations = (address: string | string[]) => {

  const query = useQuery({
    enabled: true,
    queryKey: [...useValidatorDelegationsQueryKey, address],
    queryFn: () => getValidatorDelegationsDataFn(address),
  });

  return query;
};