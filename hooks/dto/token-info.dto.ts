type TokenInfoDTO = {
  price: {
    value: number;
    change: number;
  },
  marketCap: {
    value: number;
    change: number;
  },
  volume: number;
  apr: number | string;
}

export type { TokenInfoDTO };