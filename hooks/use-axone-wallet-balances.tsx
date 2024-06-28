import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useEnvironment } from '@/context/environment-context';

type AxoneWalletBalances = {
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

const getAxoneWalletBalancesDataFn = async (address: string | string[], offset: number, baseUrl: string | undefined) => {
  const { data } = await axios.get<AxoneWalletBalances>(`${baseUrl}/wallet/balances`, { params: { address } });

  return data;
};

export const useAxoneWalletBalancesQueryKey = ['axone-wallet-balances'];

const defaultState = { balances: [], pagination: { total: '0', limit: 10, offset: 0 } };

export const useAxoneWalletBalances = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const [offset, setOffset] = useState(0);
  const [balances, setBalances] = useState<AxoneWalletBalances>(defaultState);

  const { data, ...queryInfo } = useQuery({
    enabled: true,
    refetchOnMount: true,
    queryKey: [...useAxoneWalletBalancesQueryKey, address, offset],
    queryFn: () => getAxoneWalletBalancesDataFn(address, offset, baseUrl),
  });

  useEffect(() => {
    if (data) {
      setBalances((prevData) => ({
        ...data,
        balances: [...prevData.balances, ...data.balances],
        pagination: data.pagination,
      }));
    }

    return () => {
      setBalances(defaultState);
      setOffset(0);
    };
  }, [data]);


  const showMore = () => {
    setOffset((currentOffset) => currentOffset + (balances.pagination.limit || 10));
  };

  return { ...queryInfo, data: balances, showMore };
};