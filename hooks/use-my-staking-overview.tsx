import { useChain } from '@cosmos-kit/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { chainName } from '@/core/chain';

type MyStakingOverviewData = {
  stakedAmount: string;
  delegations: string;
  claimableReward: string;
  availableBalance: string;
};

const getMyStakingOverviewDataFn = async (address: string = '', baseUrl: string | undefined) => {
  const { data } = await axios.get<MyStakingOverviewData>(baseUrl + '/staking/my/overview', { params: { address } });

  const convertedData = {
    stakedAmount: Number(data.stakedAmount).toFixed(2),
    delegations: Number(data.delegations),
    claimableReward: Number(data.claimableReward).toFixed(2),
    availableBalance: Number(data.availableBalance).toFixed(2),
  };

  return convertedData;
};

export const useMyStakingOverviewQueryKey = ['my-staking-overview'];

export const useMyStakingOverview = () => {
  const { address } = useChain(chainName);
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: !!address,
    queryKey: useMyStakingOverviewQueryKey,
    queryFn: () => getMyStakingOverviewDataFn(address, baseUrl),
    staleTime: 1000 * 60 * 2
  });

  return query;
};