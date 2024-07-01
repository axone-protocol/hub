import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { ValidatorDelegationsDTO } from './dto/validator-delegations.dto';

const getValidatorDelegationsDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorDelegationsDTO>(baseUrl + '/staking/validator-delegations', { params: { address } });

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