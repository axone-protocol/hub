import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { create } from 'zustand';
import { useEnvironment } from '@/context/environment-context';
import { SingleValidatorDTO } from './dto/single-validator.dto';

type ValidatorState = {
  validatorData: SingleValidatorDTO | null;
  setValidatorData: (data: SingleValidatorDTO) => void;
};

export const useValidatorStore = create<ValidatorState>((set, get) => ({
  validatorData: null,
  setValidatorData: (data: SingleValidatorDTO) => {
    const currentData = get().validatorData;
    if (JSON.stringify(currentData) !== JSON.stringify(data)) {
      set({ validatorData: data });
    }
  },
}));

const getSingleValidatorDataFn = async (address: string | string[], baseUrl: string | undefined) => {
  const { data } = await axios.get<SingleValidatorDTO>(`${baseUrl}/staking/validators/${address}`);

  return data;
};

export const useSingleValidatorQueryKey = ['single-validator-details'];

export const useSingleValidatorInfo = (address: string | string[]) => {
  const { baseUrl } = useEnvironment();
  const setValidatorData = useValidatorStore((state) => state.setValidatorData);

  const query = useQuery({
    enabled: true,
    queryKey: [...useSingleValidatorQueryKey, address],
    queryFn: () => getSingleValidatorDataFn(address, baseUrl),
  });

  useEffect(() => {
    if (query.status === 'success' && query.data) {
      setValidatorData(query.data);
    }
  }, [query.status, query.data, setValidatorData]);

  return query;
};