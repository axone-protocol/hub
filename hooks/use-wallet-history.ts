import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEnvironment } from '@/context/environment-context';
import { WalletHistoryDTO } from './dto/wallet-history.dto';
import { useTransactionStore } from './use-transaction-store';

export type CheckedItems = {
  all: boolean;
  send: boolean;
  delegate: boolean;
  redelegate: boolean;
  undelegate: boolean;
  claimRewards: boolean;
  ibcTransfer: boolean;
  [key: string]: boolean; // Add index signature
};

const getWalletHistoryDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<WalletHistoryDTO[]>(`${baseUrl}/wallet/reward-history`, { params: { address } });

  return data.reverse();
};

export const useSingleValidatorQueryKey = ['wallet-history'];

export const useWalletHistory = (address: string, filters: CheckedItems) => {
  const { baseUrl } = useEnvironment();
  const { transactionCompleted } = useTransactionStore();

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorQueryKey, address, !!transactionCompleted],
    queryFn: () => getWalletHistoryDataFn(address, baseUrl),
  });

  const filteredData = filters.all ? query.data : query.data?.filter(item => {
    const filterConditions = [
      filters.send && item.messages.includes('MsgSend'),
      filters.delegate && item.messages.includes('MsgDelegate'),
      filters.redelegate && item.messages.includes('redelegate'),
      filters.undelegate && item.messages.includes('MsgUndelegate'),
      filters.claimRewards && item.messages.includes('MsgWithdrawDelegatorReward'),
      filters.ibcTransfer && item.messages.includes('ibcTransfer'),
    ];

    // Include the item if any of the filter conditions are true
    return filterConditions.some(condition => condition);
  });

  return { ...query, data: filteredData };

  return query;
};