import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import create from 'zustand';
import { useEnvironment } from '@/context/environment-context';
import { ProposedBlockDTO } from '@/hooks/dto/proposed-block.dto';

type BlocksState = {
  blocks: ProposedBlockDTO[];
  setBlocks: (blocks: ProposedBlockDTO[]) => void;
  addBlock: (block: ProposedBlockDTO) => void;
}

export const useBlocksStore = create<BlocksState>((set) => ({
  blocks: [],
  setBlocks: (blocks) => set({ blocks }),
  addBlock: (block) => set((state) => {
    const isAlreadyInList = state.blocks.some((b) => b.blockHash === block.blockHash);
    if (isAlreadyInList) {
      return state;
    }
    const updatedBlocks = [block, ...state.blocks];
    if (updatedBlocks.length > 4) {
      updatedBlocks.pop();
    }
    return { blocks: updatedBlocks };
  }),
}));

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
    refetchOnMount: false,
    queryFn: () => getProposedBlocksDataFn(baseUrl),
  });

  return query;
};