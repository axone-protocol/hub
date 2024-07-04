import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { ProposedBlockDTO } from './dto/proposed-block.dto';

const getProposedBlocksDataFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<ProposedBlockDTO[]>(`${baseUrl}/staking/recently-proposed-blocks`);

  return data;
};

export const useProposedBlocksQueryKey = ['proposed-blocks'];

export const useProposedBlocks = () => {
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    enabled: true,
    queryKey: [...useProposedBlocksQueryKey],
    refetchOnWindowFocus: false,
    queryFn: () => getProposedBlocksDataFn(baseUrl),
  });

  return query;
};