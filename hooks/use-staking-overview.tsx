import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

type StakingOverviewData = {
  totalValidators: string;
  apr: string;
  totalStaked: string;
  bondedTokens: string;
};

const getStakingOverviewDataFn = async () => {
  const { data } = await api.get<StakingOverviewData>('/staking/overview');

  const convertedData = {
    totalValidators: Number(data.totalValidators),
    apr: Number(data.apr).toFixed(3),
    totalStaked: (parseFloat(data.totalStaked) / 1000000).toFixed(2),
    bondedTokens: Number(data.bondedTokens).toFixed(4),
  };

  return convertedData;
};

export const useStakingOverviewQueryKey = ['staking-overview'];

export const useStakingOverview = () => {

  const query = useQuery({
    enabled: true,
    queryKey: useStakingOverviewQueryKey,
    queryFn: () => getStakingOverviewDataFn(),
    staleTime: 1000 * 60 * 2
  });

  return query;
};