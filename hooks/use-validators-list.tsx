import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useEnvironment } from '@/context/environment-context';

export type ValidatorsListData = {
  logo: string | null;
  description: {
    moniker: string;
    details: string;
    securityContact: string;
    identity: string;
    website: string;
  };
  address: string;
  status: string;
  jailed: boolean;
  stakedAmount: string;
  commission: {
    updateTime: string;
    rate: string;
    maxChangeRate: string;
    maxRate: string;
  };
}

export enum ValidatorStatus {
  BONDED = 'Bonded',
  UNBONDED = 'UnBonded',
  JAILED = 'Jailed',
}

export enum ValidatorSortBy {
  NAME = 'Name',
  STAKED_AMOUNT = 'Staked Amount',
  COMMISSION = 'Commission',
  VOTING_POWER = 'Voting Power',
  UPTIME = 'Uptime'
}

type CountType = number | undefined;

const getValidatorsListFn = async (baseUrl: string | undefined) => {
  const { data } = await axios.get<ValidatorsListData[]>(baseUrl + '/staking/validators');
  return data;
};

export const useValidatorsListQueryKey = ['validators-list'];

export const useValidatorsList = () => {
  const [validatorStatus, setValidatorStatus] = useState<ValidatorStatus>(ValidatorStatus.BONDED);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<ValidatorSortBy | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { baseUrl } = useEnvironment();
  const query = useQuery({
    refetchOnMount: true,
    queryKey: useValidatorsListQueryKey,
    queryFn: () => getValidatorsListFn(baseUrl),
  });

  const activeCount: CountType = query.data?.filter(validator => validator.status === ValidatorStatus.BONDED).length;

  const inactiveCount: CountType = query.data?.filter(validator => validator.status === ValidatorStatus.UNBONDED).length;

  const jailedCount: CountType = query.data?.filter(validator => !!validator.jailed).length;

  let filteredData = query.data?.filter(validator => {
    if (validatorStatus === ValidatorStatus.JAILED) {
      return !!validator.jailed;
    }
    return validator.status === validatorStatus;
  });

  if (searchTerm) {
    filteredData = filteredData?.filter(validator => validator.description.moniker.includes(searchTerm));
  }
  if (sortBy) {
    filteredData = filteredData?.sort((a, b) => {
      let comparison = 0;
      if (sortBy === ValidatorSortBy.NAME) {
        comparison = a.description.moniker.localeCompare(b.description.moniker);
      } else if (sortBy === ValidatorSortBy.STAKED_AMOUNT) {
        comparison = Number(b.stakedAmount) - Number(a.stakedAmount);
      } else if (sortBy === ValidatorSortBy.COMMISSION) {
        comparison = Number(a.commission.rate) - Number(b.commission.rate);
      } else if (sortBy === ValidatorSortBy.VOTING_POWER) {
        // TODO: comparison logic for voting power when will be avaliable in response
      } else if (sortBy === ValidatorSortBy.UPTIME) {
        // TODO: add comparison logic for uptime when will be avaliable in response
      }

      if (order === 'desc') {
        comparison = -comparison;
      }

      return comparison;
    });
  }

  return {
    ...query,
    activeCount,
    inactiveCount,
    setValidatorStatus,
    validatorStatus,
    jailedCount,
    filteredData,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    order,
    setOrder
  };
};