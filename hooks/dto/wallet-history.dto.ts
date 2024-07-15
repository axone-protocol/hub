type WalletHistoryItem= {
  txHash: string;
  result: string;
  messages: string[];
  amount: number;
  time: string;
}

type Pagination = {
  total: number;
  limit: number;
  offset: number;
}

type WalletHistoryDTO = {
  history: WalletHistoryItem[];
  pagination: Pagination;
};

export type { WalletHistoryDTO };