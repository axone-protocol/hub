type SingleBlockData = {
  address: string,
  timestamp: string,
  signature: string
  status: 'Signed' | 'Proposed' | 'Missed'
}

type ValidatorUptimeDTO = {
  blocks: SingleBlockData[],
  current: string | number
}

export type { ValidatorUptimeDTO, SingleBlockData };