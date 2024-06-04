import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';

export type SingleProposedBlock = {
  height: string,
  blockHash: string,
  txs: number,
  time: string
}

export type ValidatorProposedBlocksData = {
  recentlyProposedBlocks: SingleProposedBlock[],
  total: string
}

const getSingleValidatorProposedBlocksDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorProposedBlocksData>(`${baseUrl}/staking/validators/${address}/recently-proposed-blocks`);

  const formattedData = {
    ...data,
    current: Number(data.total)
  };

  return formattedData;
};

export const useSingleValidatorProposedBlocksQueryKey = ['single-validator-proposed-blocks'];

export const useSingleValidatorProposedBlocks = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorProposedBlocksQueryKey, address],
    queryFn: () => getSingleValidatorProposedBlocksDataFn(address, baseUrl),
  });

  return query;
};