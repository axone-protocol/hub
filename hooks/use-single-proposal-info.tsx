import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand';
import { useEnvironment } from '@/context/environment-context';
import { SingleProposalDTO } from './dto/single-proposal.dto';

type ProposalState = {
  proposalData: SingleProposalDTO | null;
  setProposalData: (data: SingleProposalDTO) => void;
};

export const useProposalStore = create<ProposalState>((set, get) => ({
  proposalData: null,
  setProposalData: (data: SingleProposalDTO) => {
    const currentData = get().proposalData;
    if (JSON.stringify(currentData) !== JSON.stringify(data)) {
      set({ proposalData: data });
    }
  },
}));

const getSingleProposalDataFn = async (id: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<SingleProposalDTO>(`${baseUrl}/governance/proposals/${id}`);

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