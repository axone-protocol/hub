import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

type StakingOverviewData = {
  totalValidators: string;
  apr: string;
  totalStaked: string;
  bondedTokens: string;
};

const getStakingOverviewDataFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<StakingOverviewData>(baseUrl + '/staking/overview');

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
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: useStakingOverviewQueryKey,
    queryFn: () => getStakingOverviewDataFn(baseUrl),
    staleTime: 1000 * 60 * 2
  });

  return query;
};