type SingleProposedBlock = {
  height: string,
  blockHash: string,
  txs: number,
  time: string
}

type ValidatorProposedBlocksDTO = {
  recentlyProposedBlocks: SingleProposedBlock[],
  total: string
}

export type { ValidatorProposedBlocksDTO, SingleProposedBlock };