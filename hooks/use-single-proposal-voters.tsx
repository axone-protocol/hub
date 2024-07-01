import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useEnvironment } from '@/context/environment-context';
import { ProposalVotersDTO } from './dto/proposal-voters.dto';

const getSingleProposalVotersDataFn = async (id: string | string[], offset: number, baseUrl: string | undefined) => {
  const { data } = await axios.get<ProposalVotersDTO>(`${baseUrl}/staking/proposals/${id}/voters`, { params: { offset } });

  return data;
};

export const useSingleProposalVotersQueryKey = ['single-proposal-voters'];

const defaultState = { voters: [], pagination: { total: 0, limit: 10, offset: 0 } };

export const useSingleProposalVotersInfo = (id: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const [offset, setOffset] = useState(0);
  const [voters, setBalances] = useState<ProposalVotersDTO>(defaultState);

  const { data, ...queryInfo } = useQuery({
    enabled: true,
    queryKey: [...useSingleProposalVotersQueryKey, id],
    queryFn: () => getSingleProposalVotersDataFn(id, offset, baseUrl),
  });

  useEffect(() => {
    if (data) {
      setBalances((prevData) => ({
        ...data,
        voters: [...prevData.voters, ...data.voters],
        pagination: data.pagination,
      }));
    }

    return () => {
      setBalances(defaultState);
      setOffset(0);
    };
  }, [data]);


  const showMore = () => {
    setOffset((currentOffset) => currentOffset + (voters.pagination.limit || 10));
  };

  return { ...queryInfo, data: voters, showMore };
};