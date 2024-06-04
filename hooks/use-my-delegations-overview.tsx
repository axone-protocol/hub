import { useChain } from '@cosmos-kit/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { chainName } from '@/core/chain';

type MyDelegationsOverviewData = {
  earnings: string | number;
  delegation: string | number;
};

const getMyDelegationsOverviewDataFn = async (address: string = '', validatorAddress: string | string[] | undefined, baseUrl: string | undefined) => {
  const { data } = await axios.get<MyDelegationsOverviewData>(baseUrl + '/staking/my/validator-delegation', { params: { address, validatorAddress } });

  const convertedData = {
    earnings: Number(data.earnings).toFixed(2),
    delegation: Number(data.delegation).toFixed(2),
  };

  return convertedData;
};

export const useMyDelegationsOverviewQueryKey = ['my-delegations-overview-key'];

export const useMyDelegationsOverview = (validatorAddress: string | string[] | undefined) => {
  const { address } = useChain(chainName);
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: !!address && !!validatorAddress,
    queryKey: [...useMyDelegationsOverviewQueryKey, validatorAddress],
    queryFn: () => getMyDelegationsOverviewDataFn(address, validatorAddress, baseUrl),
  });

  return query;
};