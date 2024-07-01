export type AxoneWalletBalances = {
  balances: {
    denom: string;
    amount: string;
  }[];
  pagination: {
    total: string;
    limit: number;
    offset: number;
  };
};