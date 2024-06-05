import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

/**
 * Getting data for the current supply
 */

type GovernanceOverviewData = {
  totalProposals: number;
  currentProposals: number;
  votingPeriod: number;
  depositRequired: string;
}

const getGovernanceOverviewFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<GovernanceOverviewData>(baseUrl + '/governance/overview');

  return data;
};

export const useGovernanceOverviewQueryKey = ['governance-overview'];

export const useGovernanceOverview = () => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    refetchOnMount: true,
    queryKey: useGovernanceOverviewQueryKey,
    queryFn: () => getGovernanceOverviewFn(baseUrl),
  });

  return query;
};