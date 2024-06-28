import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand';
import { useEnvironment } from '@/context/environment-context';

type Message = {
  '@type': string;
  authority: string;
  plan: {
    name: string;
    time: string;
    height: string;
    info: string;
    upgraded_client_state: null;
  };
};

type Deposit = {
  denom: string;
  amount: string;
};

type Vote = {
  total: string;
  votingEnds: string;
  tallyInPercents: {
    yes: string;
    no: string;
    abstain: string;
    noWithVeto: string;
  };
};

type VoteOverview = {
  quorum: string;
  threshold: string;
  votingPeriod: {
    start: string;
    end: string;
  };
};

type Proposal = {
  id: string;
  messages: Message[];
  status: string;
  final_tally_result: {
    yes_count: string;
    abstain_count: string;
    no_count: string;
    no_with_veto_count: string;
  };
  submit_time: string;
  deposit_end_time: string;
  total_deposit: Deposit[];
  voting_start_time: string;
  voting_end_time: string;
  metadata: string;
  title: string;
  summary: string;
  proposer: string;
  expedited: boolean;
  failed_reason: string;
  vote: Vote;
  voteOverview: VoteOverview;
};

type SingleProposalData = {
  proposal: Proposal;
};

type ProposalState = {
  proposalData: SingleProposalData | null;
  setProposalData: (data: SingleProposalData) => void;
};

export const useProposalStore = create<ProposalState>((set, get) => ({
  proposalData: null,
  setProposalData: (data: SingleProposalData) => {
    const currentData = get().proposalData;
    if (JSON.stringify(currentData) !== JSON.stringify(data)) {
      set({ proposalData: data });
    }
  },
}));

const getSingleProposalDataFn = async (id: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<SingleProposalData>(`${baseUrl}/staking/proposals/${id}`);

  return data;
};

export const useSingleProposalQueryKey = ['single-proposal-details'];

export const useSingleProposalInfo = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const setProposalData = useProposalStore((state) => state.setProposalData);

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleProposalQueryKey, address],
    queryFn: () => getSingleProposalDataFn(address, baseUrl),
  });

  useEffect(() => {
    if (query.status === 'success' && query.data) {
      setProposalData(query.data);
    }
  }, [query.status, query.data, setProposalData]);

  return query;
};