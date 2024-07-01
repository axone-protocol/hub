/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useEnvironment } from '@/context/environment-context';
import { ProposalsListDTO } from './dto/proposals-list.dto';

export enum ProposalStatus {
  ALL = 'ALL',
  PASSED = 'PROPOSAL_STATUS_PASSED',
  UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
  REJECTED = 'PROPOSAL_STATUS_REJECTED',
  FAILED = 'PROPOSAL_STATUS_FAILED',
}

export enum ProposalSortBy {
  ID = 'Id',
  VOTING_ENDS = 'Voting Ends',
  DATE = 'Date',
}

type CountType = number | undefined;

const getProposalsListFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<ProposalsListDTO>(baseUrl + '/staking/proposals');
  return data;
};

export const useProposalsListQueryKey = ['proposals-list'];

export const useProposalsList = () => {
  const [proposalStatus, setProposalStatus] = useState<ProposalStatus>(ProposalStatus.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<ProposalSortBy | null>(ProposalSortBy.VOTING_ENDS);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { baseUrl } = useEnvironment();

  const query = useQuery({
    refetchOnMount: true,
    queryKey: useProposalsListQueryKey,
    queryFn: () => getProposalsListFn(baseUrl),
  });

  const allCount: CountType = query.data?.proposals.length;

  const passedCount: CountType = query.data?.proposals.filter(proposal => proposal.status === ProposalStatus.PASSED).length;

  const votingCount: CountType = query.data?.proposals.filter(proposal => proposal.status === ProposalStatus.VOTING_PERIOD).length;

  const depositCount: CountType = query.data?.proposals.filter(proposal => proposal.status === ProposalStatus.DEPOSIT_PERIOD).length;

  const rejectedCount: CountType = query.data?.proposals.filter(proposal => proposal.status === ProposalStatus.REJECTED).length;

  let filteredData;
  if (proposalStatus === ProposalStatus.ALL) {
    filteredData = query.data?.proposals;
  } else {
    filteredData = query.data?.proposals.filter(proposal => proposal.status === proposalStatus);
  }

  if (searchTerm) {
    filteredData = filteredData?.filter(proposal => proposal.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim()));
  }
  if (sortBy) {
    filteredData = filteredData?.sort((a, b) => {
      let comparison = 0;
      if (sortBy === ProposalSortBy.ID) {
        comparison = Number(b.id) - Number(a.id);
      } else if (sortBy === ProposalSortBy.VOTING_ENDS) {
        comparison = new Date(b.voting_end_time).getTime() - new Date(a.voting_end_time).getTime();
      } else if (sortBy === ProposalSortBy.DATE) {
        comparison = new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime();
      }
      if (order === 'desc') {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  return {
    ...query,
    passedCount,
    rejectedCount,
    proposalStatus,
    setProposalStatus,
    filteredData,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    order,
    setOrder,
    allCount,
    votingCount,
    depositCount,
  };
};