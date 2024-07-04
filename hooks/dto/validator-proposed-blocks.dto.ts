type SingleProposedBlock = {
  height: string;
  blockHash: string;
  txs: string;
  time: string;
  img: string;
  name: string;
}

type ValidatorProposedBlocksDTO = {
  recentlyProposedBlocks: SingleProposedBlock[],
  total: string
}

export type { ValidatorProposedBlocksDTO, SingleProposedBlock };