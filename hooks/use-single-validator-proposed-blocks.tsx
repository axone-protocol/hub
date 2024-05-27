import { useQuery } from '@tanstack/react-query';
import { api } from '@/core/api';

type SingeBlockData = {
  height: string,
  blockHash: string,
  txs: number,
  time: string
}

type ValidatorProposedBlocksData = {
  recentlyProposedBlocks: SingeBlockData[],
  total: string
}

const getSingleValidatorProposedBlocksDataFn = async (address: string | string[]) => {
  const { data } = await api.get<ValidatorProposedBlocksData>(`/staking/validators/${address}/recently-proposed-blocks`);

  const formattedData = {
    ...data,
    current: Number(data.total)
  };

  return formattedData;
};

export const useSingleValidatorProposedBlocksQueryKey = ['single-validator-proposed-blocks'];

export const useSingleValidatorProposedBlocks = (address: string | string[]) => {

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorProposedBlocksQueryKey, address],
    queryFn: () => getSingleValidatorProposedBlocksDataFn(address),
    refetchInterval: 10000 // 10 seconds
  });

  return query;
};