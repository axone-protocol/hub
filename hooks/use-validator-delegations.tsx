import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

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

const getValidatorDelegationsDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorDelegationsData>(baseUrl + '/staking/validator-delegations', { params: { address } });

  return data;
};

export const useValidatorDelegationsQueryKey = ['validator-delegations-list'];

export const useValidatorDelegations = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useValidatorDelegationsQueryKey, address],
    queryFn: () => getValidatorDelegationsDataFn(address, baseUrl),
  });

  return query;
};